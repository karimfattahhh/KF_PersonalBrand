function closeMenu() {}
document.querySelector('#year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
 document.querySelectorAll('.section-heading,.project-card,.timeline-row,.principles article,.quote-section blockquote').forEach(el=>{el.classList.add('reveal');observer.observe(el);});
 document.body.classList.add('motion-ready');

}

// ScrollTrigger handles only visual transitions; scrolling stays native.
if (window.gsap && window.ScrollTrigger) {
 gsap.registerPlugin(ScrollTrigger);
 document.fonts.ready.then(() => ScrollTrigger.refresh());
 window.addEventListener('load', () => requestAnimationFrame(() => ScrollTrigger.refresh()), {once: true});
}

// Pin the opening image while its type recedes into the story.
(() => {
 const runway=document.querySelector('.hero-runway'),hero=runway?.querySelector('.photo-hero');
 if(!runway||!hero||!window.gsap||!window.ScrollTrigger)return;
 gsap.matchMedia().add('(prefers-reduced-motion: no-preference) and (min-height: 600px)',()=>{
  const header=document.querySelector('.header'),photo=hero.querySelector('.landing-photo');
  const updatePinOffset=()=>{
   const offset=`${header.getBoundingClientRect().height}px`;
   if(runway.style.getPropertyValue('--hero-sticky-top')===offset)return;
   runway.style.setProperty('--hero-sticky-top',offset);
   ScrollTrigger.refresh();
  };
  document.documentElement.classList.add('hero-parallax-ready');
  updatePinOffset();
  const timeline=gsap.timeline({scrollTrigger:{
   trigger:runway,start:()=>`top ${header.offsetHeight}px`,end:'bottom bottom',scrub:true
  }});
  timeline.to(photo,{scale:1.14,yPercent:6,ease:'none'},0)
   .to('.landing-name, .landing-note, .landing-top, .landing-bottom, .paper-photo-note, .paper-edition, .hero-scribble, .landing-grid',
    {y:-24,autoAlpha:0,ease:'none'},.3);
  window.addEventListener('resize',updatePinOffset);
  return()=>{
   window.removeEventListener('resize',updatePinOffset);
   timeline.scrollTrigger?.kill();timeline.kill();
   gsap.set([photo,'.landing-name, .landing-note, .landing-top, .landing-bottom, .paper-photo-note, .paper-edition, .hero-scribble, .landing-grid'],{clearProps:'transform,opacity,visibility'});
   document.documentElement.classList.remove('hero-parallax-ready');
   runway.style.removeProperty('--hero-sticky-top');
   ScrollTrigger.refresh();
  };
 });
})();

// Keep the navigation readable everywhere and ease intentional section jumps.
const header = document.querySelector('.header');
let headerFrame = false;
function updateHeader() {
 header.classList.toggle('is-scrolled', window.scrollY > 24);
 const marker = header.getBoundingClientRect().height + 80;
 const candidates = [...header.querySelectorAll('a[href^="#"]')];
 let active;
 candidates.forEach(link => {
  const section = document.getElementById(link.hash.slice(1));
  if (section && section.getBoundingClientRect().top <= marker) active = link;
 });
 candidates.forEach(link => {link.classList.toggle('active', link === active);
  if (link === active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');});
 headerFrame = false;
}
window.addEventListener('scroll', () => {
 if (!headerFrame) { headerFrame = true; requestAnimationFrame(updateHeader); }
}, {passive: true});
updateHeader();
function anchorPosition(target) {
 const landmark = ['home','memories','intro','project-folders'].includes(target.id) ? target : target.querySelector('.eyebrow') || target;
 const offset = header.getBoundingClientRect().height + 28;
 let layoutTop = 0;
 for (let node = landmark; node; node = node.offsetParent) layoutTop += node.offsetTop;
 const desired = target.id === 'home' ? 0 : layoutTop - offset;
 return Math.max(0, Math.min(desired, document.documentElement.scrollHeight - innerHeight));
}
// Resolve deep links after fonts and chapter spacing are established.
let anchorInterrupted = false;
const initialHash = location.hash;
['wheel','touchstart'].forEach(type => window.addEventListener(type, () => {anchorInterrupted = true;}, {passive:true, once:true}));
Promise.all([document.fonts.ready, new Promise(resolve => {
 if (document.readyState === 'complete') resolve(); else window.addEventListener('load', resolve, {once:true});
})]).then(() => requestAnimationFrame(() => {
 const target = document.getElementById(initialHash.slice(1));
 if (target && !anchorInterrupted && location.hash === initialHash) window.scrollTo({top: anchorPosition(target), behavior:'instant'});
}));
if (window.gsap && window.ScrollToPlugin) {
 gsap.registerPlugin(ScrollToPlugin);
 document.documentElement.classList.add("gsap-navigation");
 let navigationTween;
 const cancelNavigation = () => navigationTween?.kill();
 window.addEventListener('wheel', cancelNavigation, {passive: true});
 window.addEventListener('touchstart', cancelNavigation, {passive: true});
 window.addEventListener('keydown', event => {
  if (['ArrowDown','ArrowUp','PageDown','PageUp','Home','End','Escape',' '].includes(event.key)) cancelNavigation();
 });
 document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
   if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
   const target = document.getElementById(link.hash.slice(1));
   if (!target || link.classList.contains('skip')) return;

   event.preventDefault(); anchorInterrupted = true; closeMenu(); cancelNavigation();
   document.documentElement.classList.add('nav-travelling');
   const destination = anchorPosition(target);
   const distance = Math.abs(destination - window.scrollY);
   if (location.hash !== link.hash) history.pushState(null, '', link.hash);
   navigationTween = gsap.to(window, {
    scrollTo: {y: destination, autoKill: false},
    duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : Math.min(0.95, Math.max(0.45, distance / 8000)),
    ease: 'power2.out', overwrite: 'auto',
    onComplete: () => {document.documentElement.classList.remove('nav-travelling'); updateHeader();},
    onInterrupt: () => document.documentElement.classList.remove('nav-travelling')
   });
  });
 });
}

// A handwritten greeting on paper, then the photograph beneath it.
(async function handwrittenIntroduction(){
 const root=document.documentElement;
 if(!root.classList.contains('intro-active'))return;
 const opening=document.querySelector('.opening');
 const skipButton=opening.querySelector('.intro-skip');
 let entrance;
 const finish=()=>{
  entrance?.kill();clearTimeout(window.introSafety);root.classList.remove('intro-active');
  try{sessionStorage.setItem('karim-intro-handwriting-v3','seen');}catch{}
  window.removeEventListener('resize',finish);document.removeEventListener('keydown',skip);
  skipButton.removeEventListener('click',finish);window.ScrollTrigger?.refresh();
 };
 const skip=e=>{if(e.key==='Escape'||e.key==='Tab')finish();};
 if(!window.gsap){finish();return;}
 window.addEventListener('resize',finish,{once:true});document.addEventListener('keydown',skip);
 skipButton.addEventListener('click',finish);
 await Promise.race([document.fonts.ready,new Promise(resolve=>setTimeout(resolve,500))]);
 if(!root.classList.contains('intro-active'))return;
 const strokes=[...opening.querySelectorAll('.hand-stroke')];
 strokes.forEach(path=>{const length=path.getTotalLength();gsap.set(path,{strokeDasharray:length,strokeDashoffset:length,opacity:0,visibility:'visible'});});
 entrance=gsap.timeline({onComplete:finish});
 let penTime=.2;
 strokes.forEach((path,index)=>{
  const duration=index<4?.19:index===strokes.length-1?.42:.16;
  entrance.set(path,{opacity:1},penTime).to(path,{strokeDashoffset:0,duration,ease:'none'},penTime);
  penTime+=duration-.015;
 });
 entrance.fromTo('.opening-paper-caption',{opacity:0,y:6},{opacity:1,y:0,duration:.5},penTime-.3)
  .to('.intro-handwriting',{y:-18,opacity:0,duration:.65,ease:'power2.in'},penTime+.5)
  .to(['.opening-paper-caption','.opening-stationery','.intro-skip'],{opacity:0,duration:.35},penTime+.5)
  .to(opening,{yPercent:-101,duration:1.05,ease:'power3.inOut'},penTime+.68);
})();

// Pointer memories are decorative; every photograph also remains in the page.
(() => {
 const stage=document.querySelector('.memory-stage');
 if(!stage || !window.gsap) return;
 const cards=[...stage.querySelectorAll('.memory-card')];
 const media=gsap.matchMedia();
 media.add('(min-width: 701px) and (hover: hover) and (prefers-reduced-motion: no-preference)',()=>{
  let lastX=-1000,lastY=-1000,lastTime=0,index=0;
  const trail=new Set();
  const move=e=>{
   const rect=stage.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top;
   cards.forEach((card,i)=>gsap.to(card,{x:(x/rect.width-.5)*(i%2?18:-18),y:(y/rect.height-.5)*(i%2?-14:14),duration:1.1,ease:'power2.out',overwrite:'auto'}));
   if(Math.hypot(x-lastX,y-lastY)<90 || performance.now()-lastTime<160)return;
   lastX=x;lastY=y;lastTime=performance.now();
   const photo=cards[index++%cards.length].querySelector('img').cloneNode();
   photo.className='memory-trail';
   if(cards[(index-1)%cards.length].classList.contains('certificate-memory'))photo.classList.add('certificate-trail');photo.alt='';photo.setAttribute('aria-hidden','true');photo.loading='eager';
   stage.append(photo);trail.add(photo);
   while(trail.size>5){const old=trail.values().next().value;gsap.killTweensOf(old);old.remove();trail.delete(old);}
   gsap.set(photo,{left:Math.max(0,Math.min(rect.width-150,x-75)),top:Math.max(0,Math.min(rect.height-190,y-95)),rotation:(index%2?1:-1)*(5+index%8)});
   gsap.fromTo(photo,{opacity:0,scale:.85,y:18},{opacity:1,scale:1,y:0,duration:.35,ease:'power3.out'});
   gsap.to(photo,{opacity:0,y:35,delay:.65,duration:.65,onComplete:()=>{trail.delete(photo);photo.remove();}});
  };
  const leave=()=>cards.forEach(card=>gsap.to(card,{x:0,y:0,duration:1,overwrite:'auto'}));
  stage.addEventListener('pointermove',move);stage.addEventListener('pointerleave',leave);
  return()=>{stage.removeEventListener('pointermove',move);stage.removeEventListener('pointerleave',leave);trail.forEach(photo=>{gsap.killTweensOf(photo);photo.remove();});gsap.set(cards,{clearProps:'transform'});};
 });
})();

// Native sticky reading pause. Taller text and smaller screens stay in normal flow.
(() => {
 const runway=document.querySelector('.journal-runway'),page=document.querySelector('.journal-page');
 if(!runway||!page)return;
 let progress,resizeTimer;
 const setup=()=>{
  progress?.scrollTrigger?.kill();progress?.kill();runway.classList.remove('is-held');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const available=innerHeight-document.querySelector('.header').offsetHeight;
  if(!reduced&&innerWidth>700&&page.scrollHeight<=available+2)runway.classList.add('is-held');
  if(window.gsap&&window.ScrollTrigger&&!reduced){
   progress=gsap.fromTo('.journal-progress i',{scaleX:0},{scaleX:1,ease:'none',scrollTrigger:{trigger:runway,start:()=>`top ${document.querySelector('.header').offsetHeight}`,end:'bottom bottom',scrub:.5}});
   ScrollTrigger.refresh();
  }
 };
 document.fonts.ready.then(setup);
 window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(setup,180);});
 matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',setup);
})();

// Keep the ink moving only while its section is in view.
(() => {
 const section=document.querySelector('.threaded-principles');
 if(!section)return;
 if('IntersectionObserver' in window){new IntersectionObserver(entries=>entries.forEach(entry=>section.classList.toggle('is-thread-visible',entry.isIntersecting)),{threshold:.05}).observe(section);}
})();

// Pencil strokes and measured letter reveals follow a relaxed handwriting rhythm.
if(window.gsap && window.ScrollTrigger){
 gsap.matchMedia().add('(prefers-reduced-motion: no-preference)',()=>{
  const study=document.querySelector('.pencil-landscape');
  if(!study)return;
  const strokes=[...study.querySelectorAll('svg path')];
  strokes.forEach(path=>{
   const length=path.getTotalLength();
   gsap.set(path,{strokeDasharray:length,strokeDashoffset:length});
  });
  const drawing=gsap.timeline({scrollTrigger:{trigger:study,start:'top 75%',once:true}});
  const main=study.querySelectorAll('.thread-cord,.thread-shadow,.thread-glint,.thread-trace');
  drawing.to(main,{strokeDashoffset:0,duration:3.4,ease:'none'},0);
  const details=strokes.filter(path=>!path.matches('.thread-cord,.thread-shadow,.thread-glint,.thread-trace'));
  drawing.to(details,{strokeDashoffset:0,duration:.55,stagger:.075,ease:'power1.inOut'},.65);
  const notes=[...study.querySelectorAll('.thread-note,.sketch-afterthought')];
  const originals=notes.map(note=>note.innerHTML);
  notes.forEach((note,index)=>{
   const walker=document.createTreeWalker(note,NodeFilter.SHOW_TEXT);
   const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
   nodes.forEach(node=>{
    const fragment=document.createDocumentFragment();
    node.textContent.split(/(\s+)/).forEach(word=>{
     if(!word)return;
     if(/^\s+$/.test(word)){fragment.append(document.createTextNode(word));return;}
     const span=document.createElement('span');span.className='pencil-word';
     span.setAttribute('aria-label',word);
     Array.from(word).forEach(letter=>{
      const glyph=document.createElement('span');glyph.className='pencil-letter';
      glyph.setAttribute('aria-hidden','true');glyph.textContent=letter;span.append(glyph);
     });
     fragment.append(span);
    });
    node.replaceWith(fragment);
   });
   const letters=note.querySelectorAll('.pencil-letter');
   gsap.set(letters,{clipPath:'inset(0 100% 0 0)'});
   const writing=gsap.timeline({delay:.4+index*.22,
    scrollTrigger:{trigger:note,start:'top 85%',once:true},
    onComplete:()=>gsap.set(letters,{clearProps:'clipPath'})});
   let penTime=0;
   note.querySelectorAll('.pencil-word').forEach((word,wordIndex)=>{
    [...word.children].forEach((glyph,letterIndex)=>{
     const letter=glyph.textContent;
     // Wider forms take longer; punctuation lifts the pencil before continuing.
     const duration=/[mwMW]/.test(letter)?.19:/[iljt.,’]/.test(letter)?.095:.145;
     const variation=((wordIndex*3+letterIndex*7)%5)*.009;
     writing.to(glyph,{clipPath:'inset(0 0% 0 0)',duration:duration+variation,ease:'sine.inOut'},penTime);
     penTime+=duration+variation-.018;
     if(/[.,!?]/.test(letter))penTime+=.24;
    });
    penTime+=.13;
   });
  });
  return()=>notes.forEach((note,index)=>note.innerHTML=originals[index]);
 });
}
