const PHOTOS = [
  {src:'images/eueela1.jpg', alt:'Nós 1'},
  {src:'images/eueela2.jpg', alt:'Nós 2'},
  {src:'images/eueela3.jpg', alt:'Nós 3'},
  {src:'images/eueela4.jpg', alt:'Nós 4'},
  {src:'images/eueela5.jpg', alt:'Nós 5'},
  {src:'images/eueela6.jpg', alt:'Nós 6'},
  {src:'images/eueela7.jpg', alt:'Nós 7'},
  {src:'images/eueela8.jpg', alt:'Nós 8'}
];

const SONGS = [
  {title:'Tão Bem', artist:'Lulu Santos', src:'songs/taobem.MP3', cover:'albums/lulusantos.jpg'},
  {title:'É Por Você Que Canto', artist:'Leandro e Leonardo', src:'songs/eporvocequecanto.MP3', cover:'albums/eporvocequecanto.jpg'},
  {title:'Amor I Love You', artist:'Marisa Monte', src:'songs/amoriloveyou.MP3', cover:'albums/marisamonte.jpg'},
  {title:'É O Amor', artist:'Zezé diCamargo e Luciano', src:'songs/eoamor.mp3', cover:'albums/zezedicamargoeluciano.jpg'},
  {title:'Nem Mais Uma Duvida', artist:'Zezé diCamargo e Luciano', src:'songs/nemmaisumaduvida.MP3', cover:'albums/nemmaisumaduvida.jpg'},
  {title:'Que Sorte A Nossa', artist:'Matheus e Kauan', src:'songs/quesorteanossa.MP3', cover:'albums/quesorteanossa.jpg'},
  {title:'Sonho De Amor', artist:'Zezé diCamargo e Luciano', src:'songs/sonhodeamor.MP3', cover:'albums/sonhodeamor.jpg'},
  {title:'Tudo Que Você Quiser', artist:'Luan Santana', src:'songs/tudoquevocequiser.MP3', cover:'albums/tudoquevocequiser.jpg'},
];

const MESSAGES = [
  {author:'eu :)', text:'Se eu ganhasse um real toda vez que eu pensasse em você, eu não teria um real... pq você não sai da minha cabeça.'},
  {author:'', text:'A melhor parte do meu dia é falar com você, é escutar sua voz naqueles audios de 3/4/5 minutos, e você dps vem me pedir desculpa, mas você sabe que EU AMO ESCUTAR SUA VOZ, eu sou o seu maior fã'},
  {author:'', text:'tenho um segredo super secreto pra te contar... tô com saudade dos teus beijinhos, abraços, carinhos e cheirinhos :/'},
  {author:'', text:'Se você fosse gripe, eu sairia na chuva só pra te pegar ;)'},
  {author:'', text:'Você é a pessoa com quem eu quero ter um milhão de aventuras, dançar na chuva, assistir ao pôr do sol juntos, almoçar juntos no domingo em família, viajar o mundo, ir à igreja e rezar junto pelo nosso propósito, deitar no teu colo depois de um dia puxado no trabalho, celebrar nossas conquistas juntos, realizar meus maiores sonhos ao teu lado e me apaixonar mais por você todos os dias da minha vida'}
];

// CARROSSEL
const slidesEl=document.getElementById('slides'), dotsEl=document.getElementById('dots'), thumbsEl=document.getElementById('thumbs');
let current=0, timer=null, AUTOPLAY_MS=4000, userInteracted=false;

function renderCarousel(){
  slidesEl.innerHTML=''; dotsEl.innerHTML=''; thumbsEl.innerHTML='';
  PHOTOS.forEach((p,i)=>{
    const s=document.createElement('div'); s.className='slide';
    const bg=document.createElement('img'); bg.className='bg'; bg.src=p.src; s.appendChild(bg);
    const main=document.createElement('img'); main.className='main'; main.src=p.src; main.alt=p.alt||''; s.appendChild(main);
    slidesEl.appendChild(s);

    const dot=document.createElement('button'); dot.className='dot'+(i===current?' active':''); dot.addEventListener('click', ()=> { goTo(i); userInteracted=true; }); dotsEl.appendChild(dot);
    const thumb=document.createElement('div'); thumb.className='thumb'+(i===current?' active':''); const img=document.createElement('img'); img.src=p.src; thumb.appendChild(img);
    thumb.addEventListener('click', ()=>{ goTo(i); userInteracted=true; }); thumbsEl.appendChild(thumb);
  });
  updateCarousel();
}

function updateCarousel(){ slidesEl.style.transform=`translateX(-${current*100}%)`; Array.from(dotsEl.children).forEach((d,i)=>d.classList.toggle('active',i===current)); Array.from(thumbsEl.children).forEach((t,i)=>t.classList.toggle('active',i===current)); }
function prev(){ current=(current-1+PHOTOS.length)%PHOTOS.length; updateCarousel(); resetAutoplay();}
function next(){ current=(current+1)%PHOTOS.length; updateCarousel(); resetAutoplay();}
function goTo(i){ current=i; updateCarousel(); resetAutoplay();}
function startAutoplay(){ stopAutoplay(); if(!userInteracted) timer=setInterval(next,AUTOPLAY_MS); }
function stopAutoplay(){ if(timer) clearInterval(timer); timer=null; }
function resetAutoplay(){ stopAutoplay(); startAutoplay(); }
document.getElementById('prev').addEventListener('click', prev);
document.getElementById('next').addEventListener('click', next);
document.getElementById('carousel').addEventListener('mouseenter', stopAutoplay);
document.getElementById('carousel').addEventListener('mouseleave', startAutoplay);
renderCarousel(); startAutoplay();

// PLAYER
const songsEl=document.getElementById('songs');
let currentSong=0;
const audio=new Audio();
const coverEl=document.getElementById('player-cover');
const titleEl=document.getElementById('player-title');
const artistEl=document.getElementById('player-artist');
const progressEl=document.getElementById('progress');
const playBtn=document.getElementById('play');
const prevBtn=document.getElementById('prevSong');
const nextBtn=document.getElementById('nextSong');

function renderSongs(){ songsEl.innerHTML=''; SONGS.forEach((s,i)=>{ const node=document.createElement('div'); node.className='song'; node.textContent=`${s.title} — ${s.artist}`; node.addEventListener('click', ()=> loadSong(i,true)); songsEl.appendChild(node); }); }

function loadSong(i, autoplay=false){
  currentSong=i; const s=SONGS[i];
  coverEl.src=s.cover||''; titleEl.textContent=s.title; artistEl.textContent=s.artist;
  audio.src=s.src;
  if(autoplay){ audio.play(); playBtn.textContent='⏸'; } else { audio.pause(); playBtn.textContent='▶️'; }
}
function playPause(){ if(audio.paused){ audio.play(); playBtn.textContent='⏸'; } else { audio.pause(); playBtn.textContent='▶️'; } }
function prevSong(){ loadSong((currentSong-1+SONGS.length)%SONGS.length,true); }
function nextSong(){ loadSong((currentSong+1)%SONGS.length,true); }

playBtn.addEventListener('click', playPause);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.ontimeupdate = () => { progressEl.value = (audio.currentTime/audio.duration)*100||0; }
progressEl.addEventListener('input',()=>{ audio.currentTime = (progressEl.value/100)*audio.duration; });

audio.onended = nextSong;
renderSongs();
loadSong(currentSong);

// MESSAGES
const messagesEl=document.getElementById('messages');
MESSAGES.forEach(m=>{ const el=document.createElement('div'); el.className='msg'; const a=document.createElement('div'); a.className='author'; a.textContent=m.author; const t=document.createElement('div'); t.className='text'; t.textContent=m.text; el.appendChild(a); el.appendChild(t); messagesEl.appendChild(el); });
