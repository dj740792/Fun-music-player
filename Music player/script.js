// DOM Elements
const app = document.getElementById('app');
const vinyl = document.getElementById('vinyl');
const albumCover = document.getElementById('albumCover');
const trackName = document.getElementById('trackName');
const trackArtist = document.getElementById('trackArtist');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const songCarousel = document.getElementById('songCarousel');
const audio = document.getElementById('audio');

// State
let currentIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let progress = 0;

// Song Data
const songs = [
  {
    id: 1,
    name: "GRACE",
    artist: "Jeff Buckley",
    image: "./jeffbuckley.jpg",
    theme: {
      gradient: "linear-gradient(to bottom, #580266, #650275, #720283, #7f0293, #8d02a2, #961aae, #9e29bb, #a736c7, #ad4cd3, #b45ede, #bb70e9, #c281f4)"
    }
  },
  {
    id: 2,
    name: "SEXTAPE",
    artist: "Deftones",
    image: "./deftones.jpg",
    theme: {
      gradient: "linear-gradient(135deg, hsl(0 0% 25%) 0%, hsl(0 0% 15%) 100%)"
    }
  },
  {
    id: 3,
    name: "STRANGERS IN THE NIGHT",
    artist: "Frank Sinatra",
    image: "./franksinatra.jpg",
    theme: {
      gradient: "linear-gradient(135deg, hsl(210 30% 25%) 0%, hsl(210 40% 15%) 100%)"
    }
  },
  {
    id: 4,
    name: "BE MY BABY",
    artist: "The Ronettes",
    image: "./bemybaby.jpg",
    theme: {
      gradient: "linear-gradient(135deg, hsl(0 70% 75%) 0%, hsl(350 60% 65%) 100%)"
    }
  },
  {
    id: 5,
    name: "ALL I NEED",
    artist: "Radiohead",
    image: "./radiohead.jpg",
    theme: {
      gradient: "linear-gradient(180deg, hsl(355 75% 65%) 0%, hsl(45 80% 60%) 50%, hsl(120 50% 55%) 100%)"
    }
  },
  {
    id: 6,
    name: "KISS OF LIFE",
    artist: "Sade",
    image: "./sade.jpg",
    theme: {
      gradient: "linear-gradient(135deg, hsl(20 30% 20%) 0%, hsl(15 40% 30%) 100%)"
    }
  },
  {
    id: 7,
    name: "STAND BY ME",
    artist: "John Lennon",
    image: "./johnlennon.jpg",
    theme: {
      gradient: "linear-gradient(135deg, hsl(160 30% 35%) 0%, hsl(140 40% 60%) 100%)"
    }
  }
];

// Load Song
function loadSong(index) {
  const song = songs[index];
  albumCover.src = song.image;
  trackName.textContent = song.name;
  trackArtist.textContent = song.artist;
  app.style.background = song.theme.gradient;
  updateCarousel();
}

// Render Song Carousel
function renderCarousel() {
  songCarousel.innerHTML = '';
  songs.forEach((song, index) => {
    const div = document.createElement('div');
    div.className = `song-item ${index === currentIndex ? 'active' : ''}`;
    div.innerHTML = `<img src="${song.image}" alt="${song.name} by ${song.artist}" />`;
    div.addEventListener('click', () => {
      currentIndex = index;
      loadSong(currentIndex);
      if (!isPlaying) {
        togglePlay();
      }
    });
    songCarousel.appendChild(div);
  });
}

// Update Carousel Active State
function updateCarousel() {
  const items = document.querySelectorAll('.song-item');
  items.forEach((item, i) => {
    item.classList.toggle('active', i === currentIndex);
  });
}

// Toggle Play/Pause
function togglePlay() {
  isPlaying = !isPlaying;
  
  if (isPlaying) {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    vinyl.classList.add('spinning');
    // Start progress simulation
    startProgressSimulation();
  } else {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    vinyl.classList.remove('spinning');
    stopProgressSimulation();
  }
}

// Progress Simulation (since we don't have actual audio files)
let progressInterval = null;

function startProgressSimulation() {
  if (progressInterval) clearInterval(progressInterval);
  
  progressInterval = setInterval(() => {
    progress += 0.5;
    if (progress >= 100) {
      if (isRepeat) {
        progress = 0;
      } else {
        handleNext();
      }
    }
    progressFill.style.width = `${progress}%`;
  }, 150);
}

function stopProgressSimulation() {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
}

// Handle Next
function handleNext() {
  if (isShuffle) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * songs.length);
    } while (newIndex === currentIndex && songs.length > 1);
    currentIndex = newIndex;
  } else {
    currentIndex = (currentIndex + 1) % songs.length;
  }
  progress = 0;
  loadSong(currentIndex);
}

// Handle Previous
function handlePrev() {
  if (isShuffle) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * songs.length);
    } while (newIndex === currentIndex && songs.length > 1);
    currentIndex = newIndex;
  } else {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  }
  progress = 0;
  loadSong(currentIndex);
}

// Handle Seek
function handleSeek(e) {
  const rect = progressBar.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const percentage = (x / rect.width) * 100;
  progress = Math.max(0, Math.min(100, percentage));
  progressFill.style.width = `${progress}%`;
}

// Toggle Shuffle
function toggleShuffle() {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle('active', isShuffle);
}

// Toggle Repeat
function toggleRepeat() {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle('active', isRepeat);
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', handleNext);
prevBtn.addEventListener('click', handlePrev);
shuffleBtn.addEventListener('click', toggleShuffle);
repeatBtn.addEventListener('click', toggleRepeat);
progressBar.addEventListener('click', handleSeek);

// Keyboard Controls
document.addEventListener('keydown', (e) => {
  switch(e.code) {
    case 'Space':
      e.preventDefault();
      togglePlay();
      break;
    case 'ArrowRight':
      handleNext();
      break;
    case 'ArrowLeft':
      handlePrev();
      break;
  }
});

// Initialize
renderCarousel();
loadSong(currentIndex);
