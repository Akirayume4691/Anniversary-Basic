const pages=Array.from(document.querySelectorAll('.page'));
const music=document.getElementById('bgMusic');
let currentPage=0,typingStarted=false,typeIndex=0,lightboxIndex=0;
const message='Happy Anniversary. This little page is made to keep our sweet memories in one place. May our love stay gentle, honest, and beautiful through every season. 💖';
const photos=['images/photo1.jpg','images/photo2.jpg','images/photo3.jpg','images/photo4.jpg'];
function playMusic(){if(music){music.volume=.75;music.play().catch(()=>{})}}
function startExperience(){playMusic();goToPage(1)}
function goToPage(i){if(i<0||i>=pages.length)return;pages.forEach(p=>p.classList.remove('active'));pages[i].classList.add('active');currentPage=i;if(pages[i].id==='messagePage'&&!typingStarted){typingStarted=true;typeMessage()}}
function nextPage(){playMusic();goToPage(currentPage+1)}
function prevPage(){playMusic();goToPage(currentPage-1)}
function replay(){goToPage(0)}
function typeMessage(){const el=document.getElementById('typewriter');if(!el)return;if(typeIndex<message.length){el.textContent+=message.charAt(typeIndex);typeIndex++;setTimeout(typeMessage,35)}}
document.addEventListener('click',playMusic,{once:true});
document.querySelectorAll('.memory-photo').forEach((p,i)=>p.addEventListener('click',()=>openLightbox(i)));
function openLightbox(i){lightboxIndex=(i+photos.length)%photos.length;document.getElementById('lightboxImg').src=photos[lightboxIndex];document.getElementById('caption').textContent=`Memory ${String(lightboxIndex+1).padStart(2,'0')}`;document.getElementById('lightbox').classList.add('open')}
function closeLightbox(){document.getElementById('lightbox').classList.remove('open')}
function changePhoto(step){openLightbox(lightboxIndex+step)}
document.addEventListener('keydown',e=>{const b=document.getElementById('lightbox');if(b.classList.contains('open')){if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')changePhoto(-1);if(e.key==='ArrowRight')changePhoto(1);return}if(e.key==='ArrowRight')nextPage();if(e.key==='ArrowLeft')prevPage()});
let startX=0;document.addEventListener('touchstart',e=>{startX=e.touches[0].clientX},{passive:true});document.addEventListener('touchend',e=>{if(document.getElementById('lightbox').classList.contains('open'))return;const d=e.changedTouches[0].clientX-startX;if(Math.abs(d)>70){d<0?nextPage():prevPage()}},{passive:true});
const hearts=document.querySelectorAll('.heart');document.addEventListener('pointermove',e=>{const x=(e.clientX/window.innerWidth-.5)*20,y=(e.clientY/window.innerHeight-.5)*20;hearts.forEach((h,i)=>{const depth=(i+1)/4;h.style.setProperty('--mx',`${x*depth}px`);h.style.setProperty('--my',`${y*depth}px`)})});
