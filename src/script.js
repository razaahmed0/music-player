import images from "./images/*.jpg";
import tracks from "./music/*.mp3";

const audio = document.querySelector("#audio");
const cover = document.querySelector("#cover");
const musicContainer = document.querySelector(".music-container");
const nextBtn = document.querySelector("#next");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");

// Song titles
const songs = ["hey", "summer", "ukulele"];

// Keep track of songs
let songIndex = 2;

// Initially load song into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
	audio.src = tracks[song];
	cover.src = images[song];
	title.innerText = song;
}
console.log(tracks);

function playSong() {
	musicContainer.classList.add("play");
	playBtn.querySelector("i.fas").classList.remove("fa-play");
	playBtn.querySelector("i.fas").classList.add("fa-pause");

	audio.play();
}

function pauseSong() {
	musicContainer.classList.remove("play");
	playBtn.querySelector("i.fas").classList.remove("fa-pause");
	playBtn.querySelector("i.fas").classList.add("fa-play");

	audio.pause();
}

function prevSong() {
	songIndex--;
	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}

	loadSong(songs[songIndex]);
	playSong();
}

function nextSong() {
	songIndex++;
	if (songIndex >= songs.length) {
		songIndex = 0;
	}

	loadSong(songs[songIndex]);
	playSong();
}

function updateProgress(e) {
	const { duration, currentTime } = e.srcElement;
	const progressPercentage = (currentTime / duration) * 100;

	progress.style.width = `${progressPercentage}%`;
}

function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener("click", () => {
	const isPlaying = musicContainer.classList.contains("play");
	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

// Change song events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);