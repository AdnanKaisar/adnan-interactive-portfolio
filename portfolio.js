const data={
 sharebite:{kicker:'Project 01 / Full-stack platform',title:'ShareBite',body:'A food donation platform connecting surplus food donors with individuals and organizations in need. I developed REST APIs, JWT authentication, role-based access control, MongoDB workflows, and the React frontend integration.',links:[['Live demo','https://sharebite-one.vercel.app'],['GitHub','https://github.com/AdnanKaisar/Sharebite'] ]},
 agent:{kicker:'Project 02 / AI automation',title:'Self-Tasking AI Agent',body:'An LLM-powered agent that understands and executes multi-step tasks through a conversational web interface. Built with Python, FastAPI, React.js, LangChain, and LLMs, with conversational memory and real-time tracking.',links:[['GitHub','https://github.com/AdnanKaisar']]},
 portfolio:{kicker:'Project 03 / Personal product',title:'Netflix-Inspired Portfolio',body:'A responsive personal portfolio built with HTML, CSS, JavaScript, and React.js to showcase projects, skills, internships, and development journey through an interactive experience.',links:[['GitHub','https://github.com/AdnanKaisar']]},
 'interactive-portfolio':{kicker:'Project 04 / Interactive experience',title:'Interactive Developer Portfolio',body:'A modern, interactive developer portfolio designed with smooth animations, immersive interactions, and a premium visual experience.<br><br><strong>Tech Stack:</strong> React.js, JavaScript/TypeScript, GSAP, Lenis, Three.js, HTML, CSS<br><br><strong>Key Features:</strong> Smooth inertial scrolling, GSAP entrance and scroll animations, cursor-following reveal mask, custom animated cursor, magnetic interactions, text reveals, parallax project cards, subtle Three.js particle effects, responsive layouts, and performance-optimized motion.',links:[['Live Demo','http://127.0.0.1:8004/index.html?premium=cursor-scroll-fix#home'],['GitHub','https://github.com/AdnanKaisar']]}
};
const modal=document.querySelector('.modal'),close=()=>modal.classList.remove('open');
document.querySelectorAll('.project-card').forEach(card=>card.addEventListener('click',()=>{const item=data[card.dataset.project];document.querySelector('.modal-kicker').textContent=item.kicker;document.querySelector('.modal-title').textContent=item.title;document.querySelector('.modal-body').innerHTML=`<p>${item.body}</p>`;document.querySelector('.modal-links').innerHTML=item.links.map(([label,url])=>`<a href="${url}" target="_blank" rel="noopener">${label} ↗</a>`).join('');modal.classList.add('open')}));
document.querySelectorAll('[data-project-action]').forEach(link=>link.addEventListener('click',event=>event.stopPropagation()));
document.querySelector('.modal-close').addEventListener('click',close);modal.addEventListener('click',e=>{if(e.target===modal)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');let x=0,y=0,rx=0,ry=0;
if(matchMedia('(pointer:fine)').matches){const updateCursor=e=>{x=e.clientX;y=e.clientY;dot.style.opacity=1;ring.style.opacity=1};document.addEventListener('pointermove',updateCursor,{passive:true});document.addEventListener('pointerleave',()=>{dot.style.opacity=0;ring.style.opacity=0},{passive:true});document.querySelectorAll('[data-cursor]').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('active'));el.addEventListener('mouseleave',()=>ring.classList.remove('active'))});(function loop(){rx+=(x-rx)*.16;ry+=(y-ry)*.16;dot.style.left=`${x}px`;dot.style.top=`${y}px`;ring.style.left=`${rx}px`;ring.style.top=`${ry}px`;requestAnimationFrame(loop)})()}
document.querySelectorAll('.magnetic').forEach(el=>el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`}));document.querySelectorAll('.magnetic').forEach(el=>el.addEventListener('mouseleave',()=>el.style.transform=''));
const certificateViewer=document.querySelector('.certificate-viewer');
const certificateStart=document.querySelector('.certificate-start');
const certificateFrame=document.querySelector('.certificate-document iframe');
document.querySelectorAll('[data-certificate-viewer]').forEach(card=>card.addEventListener('click',event=>{
  event.preventDefault();
  certificateViewer.classList.remove('started');
  certificateViewer.setAttribute('aria-hidden','false');
  certificateViewer.classList.add('open');
}));
certificateStart.addEventListener('click',()=>{
  certificateFrame.src='cis-df-certificate.pdf#view=FitH';
  certificateViewer.classList.add('started');
});
document.querySelector('.certificate-close').addEventListener('click',()=>{
  certificateViewer.classList.remove('open','started');
  certificateViewer.setAttribute('aria-hidden','true');
  certificateFrame.src='';
});
const parallaxPhotos=document.querySelectorAll('[data-parallax]');
window.addEventListener('scroll',()=>{
  parallaxPhotos.forEach(photo=>{
    const rect=photo.getBoundingClientRect();
    const shift=(window.innerHeight/2-(rect.top+rect.height/2))*Number(photo.dataset.parallax);
    photo.style.setProperty('--photo-shift',`${Math.max(-24,Math.min(24,shift))}px`);
  });
},{passive:true});
const resumeMenu=document.querySelector('.resume-menu');
const closeResumeMenu=()=>{resumeMenu.classList.remove('open');resumeMenu.setAttribute('aria-hidden','true')};
document.querySelector('[data-resume-menu]').addEventListener('click',()=>{resumeMenu.classList.add('open');resumeMenu.setAttribute('aria-hidden','false')});
document.querySelector('.resume-menu-close').addEventListener('click',closeResumeMenu);
resumeMenu.addEventListener('click',event=>{if(event.target===resumeMenu)closeResumeMenu()});

const finePointer=matchMedia('(pointer:fine)').matches;
const soundToggle=document.querySelector('.sound-toggle');
let soundEnabled=false;
soundToggle.addEventListener('click',()=>{soundEnabled=!soundEnabled;soundToggle.querySelector('span').textContent=soundEnabled?'on':'off'});
document.querySelectorAll('a,button,.project-card').forEach(el=>el.addEventListener('click',()=>{
  if(!soundEnabled)return;
  const context=new AudioContext();const oscillator=context.createOscillator();const gain=context.createGain();
  oscillator.frequency.value=520;gain.gain.setValueAtTime(.025,context.currentTime);gain.gain.exponentialRampToValueAtTime(.001,context.currentTime+.08);
  oscillator.connect(gain).connect(context.destination);oscillator.start();oscillator.stop(context.currentTime+.08);
}));
const backTop=document.querySelector('.back-top');
addEventListener('scroll',()=>backTop.classList.toggle('visible',scrollY>600),{passive:true});
backTop.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

if(window.Lenis){
  const lenis=new Lenis({duration:1.15,smoothWheel:true,syncTouch:true,gestureOrientation:'vertical',eventsTarget:document});
  lenis.on('scroll',()=>window.ScrollTrigger?.update());
  const frame=time=>{lenis.raf(time);requestAnimationFrame(frame)};requestAnimationFrame(frame);
}
if(window.gsap&&window.ScrollTrigger){
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.reveal').forEach(element=>gsap.fromTo(element,{opacity:0,y:36,filter:'blur(8px)'},{opacity:1,y:0,filter:'blur(0)',duration:.9,ease:'power3.out',scrollTrigger:{trigger:element,start:'top 86%',toggleActions:'play none none reverse'}}));
  document.querySelectorAll('.project-card').forEach(card=>gsap.to(card,{yPercent:-5,ease:'none',scrollTrigger:{trigger:card,start:'top bottom',end:'bottom top',scrub:true}}));
}
if(finePointer){
  const mask=document.querySelector('.reveal-mask-layer');let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
  addEventListener('mousemove',event=>{mx=event.clientX;my=event.clientY});
  const moveMask=()=>{cx+=(mx-cx)*.1;cy+=(my-cy)*.1;mask.style.clipPath=`circle(170px at ${cx}px ${cy}px)`;requestAnimationFrame(moveMask)};moveMask();
}
if(window.THREE&&finePointer){
  const canvas=document.querySelector('.particle-canvas');const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(innerWidth,innerHeight);
  const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.1,100);camera.position.z=7;
  const geometry=new THREE.BufferGeometry();const positions=new Float32Array(960);
  for(let i=0;i<positions.length;i+=3){positions[i]=(Math.random()-.5)*12;positions[i+1]=(Math.random()-.5)*8;positions[i+2]=(Math.random()-.5)*5}
  geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));const points=new THREE.Points(geometry,new THREE.PointsMaterial({color:0xb5f36b,size:.018,transparent:true,opacity:.65}));scene.add(points);
  let px=0,py=0;addEventListener('mousemove',event=>{px=(event.clientX/innerWidth-.5)*.4;py=(event.clientY/innerHeight-.5)*.4});
  const render=()=>{points.rotation.y+=(px-points.rotation.y)*.01;points.rotation.x+=(py-points.rotation.x)*.01;renderer.render(scene,camera);requestAnimationFrame(render)};render();
  addEventListener('resize',()=>{renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix()});
}else if(finePointer){
  const canvas=document.querySelector('.particle-canvas');const context=canvas.getContext('2d');const particles=Array.from({length:90},()=>({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.00015,vy:(Math.random()-.5)*.00015,r:Math.random()*1.6+.4}));
  const resize=()=>{canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;context.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)};resize();addEventListener('resize',resize);
  const renderFallback=()=>{context.clearRect(0,0,innerWidth,innerHeight);context.fillStyle='rgba(181,243,107,.55)';particles.forEach(p=>{p.x=(p.x+p.vx+1)%1;p.y=(p.y+p.vy+1)%1;context.beginPath();context.arc(p.x*innerWidth,p.y*innerHeight,p.r,0,Math.PI*2);context.fill()});requestAnimationFrame(renderFallback)};renderFallback();
}
