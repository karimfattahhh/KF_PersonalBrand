// Reading enhancements are optional; the complete article is visible without JavaScript.
const progress = document.querySelector('.essay-progress i');
let scheduled = false;
function updateProgress() {
 const distance = document.documentElement.scrollHeight - innerHeight;
 if (progress) progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 1})`;
 scheduled = false;
}
addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); } }, {passive:true});
addEventListener('resize', updateProgress);
addEventListener('load', updateProgress);
updateProgress();
const sections = [...document.querySelectorAll('.essay-section')];
const links = [...document.querySelectorAll('.essay-contents a')];
if ('IntersectionObserver' in window) {
 const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
  if (!visible.length) return;
  links.forEach(link => { if(link.hash === `#${visible[0].target.id}`) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
 }, {rootMargin:'-15% 0px -55% 0px',threshold:0});
 sections.forEach(section => observer.observe(section));
}

// One-time ink gestures in the page margins, with the reading surface always visible.
(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const running = new Set();
 const animate = (el, frames, timing) => {
  if (reduced.matches || !el.animate) return;
  const animation = el.animate(frames, timing); running.add(animation);
  animation.finished.then(() => running.delete(animation)).catch(() => running.delete(animation));
 };
 const reveal = el => {
  el.querySelectorAll('svg path').forEach(path => {
   const length = path.getTotalLength();
   animate(path,[{strokeDasharray:`${length}`,strokeDashoffset:length},{strokeDasharray:`${length}`,strokeDashoffset:0}],{duration:1250,easing:'ease-out'});
  });
  el.querySelectorAll('.journal-note').forEach((note,i) => animate(note,[{opacity:.55,translate:'0 12px'},{opacity:1,translate:'0 0'}],{duration:600,delay:i*110,easing:'ease-out'}));
 };
 if (!('IntersectionObserver' in window)) return;
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if(entry.isIntersecting){reveal(entry.target);observer.unobserve(entry.target);}
 }),{threshold:.2});
 document.querySelectorAll('.journal-seam,.journal-insert,.margin-thought,.essay-takeaway').forEach(el => observer.observe(el));
 reduced.addEventListener('change',()=>{if(reduced.matches)running.forEach(a=>a.cancel());});
 addEventListener('pagehide',()=>{running.forEach(a=>a.cancel());observer.disconnect();},{once:true});
})();
