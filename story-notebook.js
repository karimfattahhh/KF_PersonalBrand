(() => {
 const book=document.querySelector('.personal-book'); if(!book)return;
 const cover=book.querySelector('.book-cover'), pages=[...book.querySelectorAll('.book-page')];
 const controls=document.querySelector('.book-controls'), prev=controls.querySelector('[data-book-prev]'), next=controls.querySelector('[data-book-next]'), close=controls.querySelector('.book-close'), status=controls.querySelector('.book-status');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'); let index=0,busy=false,animations=[];
 book.classList.add('book-ready'); pages.forEach((p,i)=>p.hidden=i!==0);
 function update(){prev.disabled=index===0;next.disabled=index===pages.length-1;status.textContent=`${String(index+1).padStart(2,'0')} / ${String(pages.length).padStart(2,'0')}`;}
 function reveal(page){
  if(reduced.matches)return;
  page.querySelectorAll('.book-writing h3,.book-writing p').forEach((el,n)=>{
   if(!el.dataset.split){const text=el.textContent;el.setAttribute('aria-label',text);el.replaceChildren(...text.split(/(\s+)/).map(word=>{if(/^\s+$/.test(word))return document.createTextNode(word);const span=document.createElement('span');span.textContent=word;span.setAttribute('aria-hidden','true');span.style.display='inline-block';return span;}));el.dataset.split='true';}
   el.querySelectorAll('span').forEach((span,j)=>animations.push(span.animate([{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,delay:140+n*150+j*12,fill:'backwards',easing:'ease-out'})));
  });
 }
 function clear(){animations.forEach(a=>a.cancel());animations=[];}
 async function turn(to){
  if(busy||to<0||to>=pages.length)return;busy=true;clear();book.scrollIntoView({block:'start',behavior:reduced.matches?'instant':'smooth'});
  const forward=to>index, old=pages[index];
  const sheet=document.createElement('div');sheet.className='page-turn-sheet'+(forward?'':' is-backward');sheet.setAttribute('aria-hidden','true');sheet.inert=true;
  const front=document.createElement('div'),back=document.createElement('div');front.className='turn-face';back.className='turn-face turn-back';
  front.append(old.querySelector(forward?'.leaf-right':'.leaf-left').cloneNode(true));back.append(pages[to].querySelector(forward?'.leaf-left':'.leaf-right').cloneNode(true));sheet.append(front,back);
  const height=book.offsetHeight;book.style.minHeight=height+'px';old.hidden=true;index=to;pages[index].hidden=false;update();
  if(!reduced.matches){book.append(sheet);const direction=forward?-1:1;const motion=sheet.animate([{transform:'rotateY(0deg)'},{transform:`rotateY(${direction*85}deg)`,offset:.5},{transform:`rotateY(${direction*180}deg)`}],{duration:1100,easing:'cubic-bezier(.4,.05,.2,1)',fill:'forwards'});reveal(pages[index]);await motion.finished.catch(()=>{});sheet.remove();}
  book.style.minHeight='';busy=false;pages[index].focus({preventScroll:true});update();book.scrollIntoView({block:'start',behavior:reduced.matches?'instant':'smooth'});
 }
 cover.addEventListener('click',async()=>{if(busy)return;busy=true;cover.setAttribute('aria-expanded','true');if(!reduced.matches){await cover.animate([{transform:'rotate(-3deg) rotateY(0)',opacity:1},{transform:'rotate(-1deg) rotateY(-110deg)',opacity:0}],{duration:650,easing:'ease-in-out'}).finished.catch(()=>{});}book.classList.add('is-open');controls.hidden=false;busy=false;update();reveal(pages[index]);pages[index].focus({preventScroll:true});});
 prev.addEventListener('click',()=>turn(index-1));next.addEventListener('click',()=>turn(index+1));
 close.addEventListener('click',()=>{if(busy)return;clear();book.classList.remove('is-open');controls.hidden=true;cover.setAttribute('aria-expanded','false');cover.focus({preventScroll:true});update();});
 book.addEventListener('keydown',e=>{if(!book.classList.contains('is-open'))return;if(e.key==='ArrowRight'){e.preventDefault();turn(index+1);}if(e.key==='ArrowLeft'){e.preventDefault();turn(index-1);}});
 reduced.addEventListener('change',()=>{if(reduced.matches)clear();});
})();
