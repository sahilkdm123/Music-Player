let state = false;
let playBtn = document.getElementById("play");
let prevBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");
let record = document.querySelector(".record");
let toneArm = document.querySelector(".tone-arm");
let volumeSlider = document.querySelector(".slider");
let songName = document.getElementById("title");
let playlist = document.querySelectorAll(".playlist li");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

const songDuration = document.getElementById("song-duration");
const songs = ["dream", "melody", "peace"];
let songIndex = 1; // Start with the first song in the playlist

const audioInfoContainer = document.getElementById("audio-container");

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  songName.innerText = song.charAt(0).toUpperCase() + song.slice(1);
  audio.src = `music/${song}.mp3`;
  record.style.animationPlayState = "paused";
  cover.style.animationPlayState = "paused";
}

// Play button click event
playBtn.addEventListener("click", () => {
  if (!state) {
    playSong();
  } else {
    pauseSong();
  }
});

// Play song
function playSong() {
  record.style.animationPlayState = "running";
  cover.style.animationPlayState = "running";
  toneArm.classList.add("play");
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  audio.play();
  updateImage();
  updateSongName();
  state = true;

  audioInfoContainer.classList.add("visible");
}

// Pause song
function pauseSong() {
  record.style.animationPlayState = "paused";
  cover.style.animationPlayState = "paused";
  toneArm.classList.remove("play");
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  audio.pause();
  state = false;

  audioInfoContainer.classList.remove("visible");
}

// Previous song
prevBtn.addEventListener("click", () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  const prevSong = songs[songIndex];
  loadSong(prevSong);
  playSong();
});

// Next song
nextBtn.addEventListener("click", () => {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  const nextSong = songs[songIndex];
  loadSong(nextSong);
  playSong();
});

// Song slider input event
volumeSlider.addEventListener("input", (e) => {
  audio.volume = Number(e.target.value);
});

// Update song progress and duration
audio.addEventListener("timeupdate", () => {
  const currentTime = formatTime(audio.currentTime);
  const totalDuration = formatTime(audio.duration);
  songDuration.textContent = `${currentTime} / ${totalDuration}`;

  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;
});

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const totalDuration = audio.duration;

  const progressPercent = (currentTime / totalDuration) * 100;
  progress.style.width = `${progressPercent}%`;

  songDuration.textContent = `${formatTime(currentTime)} / ${formatTime(
    totalDuration
  )}`;
});

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Helper function to format time in mm:ss format
function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const formattedTime = `${String(minutes).padStart(2, "0")}: ${String(
    seconds
  ).padStart(2, "0")}`;
  return formattedTime;
}

// Update the cover image based on the current song's name
function updateImage() {
  const currentSong = songs[songIndex];
  const imageSrc = `images/${currentSong}.jpg`;
  cover.src = imageSrc;
}

// Update the song name based on the current song's name
function updateSongName() {
  const currentSong = songs[songIndex];
  songName.textContent =
    currentSong.charAt(0).toUpperCase() + currentSong.slice(1);
}

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);
