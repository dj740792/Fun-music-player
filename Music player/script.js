// SONG COLLECTION
const songs = [
  {
    title: "ALL I NEED",
    artist: "Radiohead",
    cover: "radiohead.jpg",
    audio: "allineed.mp3",
    theme: {
      background: "linear-gradient(180deg,#c63d3d 0%,#d9a441 45%,#5aa84f 100%)",
      progress: "#c63d3d",
    },
  },
  {
    title: "GRACE",
    artist: "Jeff Buckley",
    cover: "jeffbuckley.jpg",
    audio: "jeffsong.mp3",
    theme: {
      background: "linear-gradient(180deg,#630378,#b05ffb)",
      progress: "#630378",
    },
  },
  {
    title: "SEXTAPE",
    artist: "Deftones",
    cover: "deftones.jpg",
    audio: "sextape.mp3",
    theme: {
      background: "linear-gradient(180deg,#1c1c1c,#2b2b2b)",
      progress: "#bfbfbf",
    },
  },
  {
    title: "STRANGERS IN THE NIGHT",
    artist: "Frank Sinatra",
    cover: "franksinatra.jpg",
    audio: "frank.mp3",
    theme: {
      background:
        "linear-gradient(to bottom, #4e4002, #6a5918, #86732d, #a48e42, #c2aa58, #d0b766, #dfc575, #edd383, #efd58c, #f0d796, #f1d99f, #f2dba8)",
      progress: "#d4af37",
    },
  },
  {
    title: "BE MY BABY",
    artist: "The Ronettes",
    cover: "bemybaby.jpg",
    audio: "bemybaby.mp3",
    theme: {
      background: "linear-gradient(180deg, #f3c6c6 0%, #f6e3e3 100%)",
      progress: "#c84b4b",
    },
  },
  {
    title: "KISS OF LIFE",
    artist: "Sade",
    cover: "sade.jpg",
    audio: "sade.mp3",
    theme: {
      background: "linear-gradient(180deg, #2c1f1a 0%, #5a3b2e 100%)",
      progress: "#c97c5d",
    },
  },
  {
    title: "STAND BY ME",
    artist: "John Lennon",
    cover: "johnlennon.jpg",
    audio: "lennon.mp3",
    theme: {
      background: "linear-gradient(180deg, #2f5d50 0%, #a8d5ba 100%)",
      progress: "#4caf50",
    },
  },
];

// DOM
const app = document.getElementById("app");
const trackName = document.getElementById("trackName");
const trackArtist = document.getElementById("trackArtist");
const albumCover = document.getElementById("albumCover");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");
const progressFill = document.getElementById("progressFill");

const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");
const Carousel = document.getElementById("carousel");

// AUDIO
const audio = new Audio();

// STATE
let currentSong = 0;
let isPlaying = false;

// LOAD SONG
function loadSong(index) {
  const song = songs[index];

  trackName.textContent = song.title;
  trackArtist.textContent = song.artist;
  albumCover.src = song.cover;

  document.body.style.background = song.theme.background;
  progressFill.style.background = song.theme.progress;

  audio.src = song.audio;
  progressFill.style.width = "0%";
}

// PLAY / PAUSE
function playSong() {
  audio.play();
  isPlaying = true;
  playIcon.style.display = "none";
  pauseIcon.style.display = "block";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playIcon.style.display = "block";
  pauseIcon.style.display = "none";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// NEXT / PREV
nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
  renderCarousel(); // Update carousel
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
  renderCarousel(); // Update carousel
});

// PROGRESS
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const percent = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = percent + "%";
});

// SEEK
progressBar.addEventListener("click", (e) => {
  const rect = progressBar.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audio.currentTime = percent * audio.duration;
});

function renderCarousel() {
  Carousel.innerHTML = "";

  songs.forEach((song, index) => {
    const img = document.createElement("img");
    img.src = song.cover;
    img.alt = song.title;
    if (index === currentSong) {
      return;
    }
    img.addEventListener("click", () => {
      currentSong = index;
      loadSong(index);
      audio.play();
      isPlaying = true;
      playSong()
    });

    Carousel.appendChild(img);
  });
}
renderCarousel();

// INIT
loadSong(currentSong);
