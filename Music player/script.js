// SONG COLLECTIONS

const songs = [
  {
    title: "ALL I NEED",
    artist: "Radiohead",
    cover: "radiohead.jpg",
    audio: "allineed.mp3",
    theme: {
      background:
        "linear-gradient(180deg, #c63d3d 0%, #d9a441 45%, #5aa84f 100%)",
      progress: "#c63d3d",
    },
  },
  {
    title: "GRACE",
    artist: "Jeff Buckley",
    cover: "jeffbuckley.jpg",
    audio: "jeffsong.mp3",
    theme: {
      background:
        "linear-gradient(to bottom, #630378, #6b0288, #720198, #7903a9, #7f06bb, #8516c6, #8a21d2, #902bdd, #983ae5, #a047ec, #a853f4, #b05ffb)",
      progress: "#630378",
    },
  },
  {
    title: "SEXTAPE",
    artist: "Deftones",
    cover: "deftones.jpg",
    audio: "sextape.mp3",
    theme: {
      background: "linear-gradient(180deg, #1c1c1c 0%, #2b2b2b 100%)",
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

// DOM SELECTORS
const app = document.getElementById("app");

// Track info
const trackName = document.getElementById("trackName");
const trackArtist = document.getElementById("trackArtist");
const albumCover = document.getElementById("albumCover");

// Controls
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");

// Progess
const progessBar = document.getElementById("progressBar");
const progressFill = document.getElementById("progressFill");

// Carousel
const Carousel = document.getElementById("carousel");

// Audio
const audio = document.createElement("audio");

let currentSong = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
updateSong();

prevBtn.addEventListener("click", function () {
  if (currentSong === 0) {
    return;
  }
  currentSong--;
  updateSong();
  audio.play(); // Automatically play the song
});

nextBtn.addEventListener("click", function () {
  if (currentSong === songs.length - 1) {
    return;
  }
  currentSong++;
  updateSong();
  audio.play(); // Automatically play the song
});

function updateSong() {
  const song = songs[currentSong];
  trackName.innerText = song.title;
  trackArtist.innerText = song.artist;
  albumCover.src = song.cover;
  document.body.style.background = song.theme.background; // Set background
  progressFill.style.background = song.theme.progress; // Set progress bar color

  audio.src = song.audio;
}

function moveProgessFill() {
  const progressPercentage = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = `${progressPercentage}%`; // Update progress bar width
}

audio.addEventListener("timeupdate", moveProgessFill);

playBtn.addEventListener("click", function () {
  audio.play();
});
