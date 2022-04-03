
// Variables Constantes del programa
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Lista de los titulos de la cancion
const songs = ['atthedoor', 'baddecisions', 'brooklynbridge'];

// Tener en consideracion con cual cancion se empieza
let songIndex = 2;

// Se cargan las canciones en la pagina
loadSong(songs[songIndex]);

// Actualizar la informacion de la cancion
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.png`;
}

// Reproducir cancion
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pausar
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Esoger cancion anterior
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Siguiente cancion
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Actualizar el progreso de la cancion
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Establecer un progreso
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Regresa la duracion y tiempo de la cancion 
function DurTime (e) {
    const {duration,currentTime} = e.srcElement;
    var sec;
    var sec_d;

    // Minutos
    let min = (currentTime==null)? 0:
     Math.floor(currentTime/60);
     min = min <10 ? '0'+min:min;

    // Segundos
    function get_sec (x) {
        if(Math.floor(x) >= 60){
			
            for (var i = 1; i<=60; i++){
                if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
                    sec = Math.floor(x) - (60*i);
                    sec = sec <10 ? '0'+sec:sec;
                }
            }
        }else{
            sec = Math.floor(x);
            sec = sec <10 ? '0'+sec:sec;
         }
    } 

    get_sec (currentTime,sec);

    // Cambia el tiempo actual la pagina
    currTime.innerHTML = min +':'+ sec;

    // Define la duracion de minutos 
    let min_d = (isNaN(duration) === true)? '0':
        Math.floor(duration/60);
     min_d = min_d <10 ? '0'+min_d:min_d;


     function get_sec_d (x) {
        if(Math.floor(x) >= 60){
			
            for (var i = 1; i<=60; i++){
                if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
                    sec_d = Math.floor(x) - (60*i);
                    sec_d = sec_d <10 ? '0'+sec_d:sec_d;
                }
            }
        }else{
            sec_d = (isNaN(duration) === true)? '0':
            Math.floor(x);
            sec_d = sec_d <10 ? '0'+sec_d:sec_d;
         }
    } 

    // Define la duracion de segundos
	
    get_sec_d (duration);

    // Se cambia los datos en la pagina 
    durTime.innerHTML = min_d +':'+ sec_d;
		
};

// Listeners de eventos
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// CCambiar cancion
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Actualizacion de tiempo y cancion
audio.addEventListener('timeupdate', updateProgress);

// Dar click en la barra de progreso
progressContainer.addEventListener('click', setProgress);

// Final de la cancion
audio.addEventListener('ended', nextSong);

// Tiempo de la cancion
audio.addEventListener('timeupdate',DurTime);