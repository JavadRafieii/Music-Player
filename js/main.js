'use strict';

const songs = [
    {
        id: 0,
        name: 'Shape Of My Heart',
        singer: 'Sting',
        img: './image/leon.jpeg',
        song: './song/song-1.mp3',
    },
    {
        id: 1,
        name: 'Another Love',
        singer: 'Tom Odell',
        img: './image/another-love.jpeg',
        song: './song/song-2.mp3',
    },
    {
        id: 2,
        name: 'Hello Welcome Home',
        singer: 'Billie Eilish',
        img: './image/Hello-Welcome-Home.jpg',
        song: './song/song-3.mp3',
    },
];

class musicPlayer {
    constructor() {
        this.isPlaying = false;
        this.current = 0;
        this.rotate = 0;
        this.onlineTime;
        this.rotateCurrent;
        this.progressBar;
        this.audio = document.getElementById('audio');
        this.playOrPause = document.getElementById('play-pause');
        this.playOrPauseIcon = document.getElementById('play-pause-icon');
        this.time = document.getElementsByClassName('current-time');
        this.total = document.getElementsByClassName('total-time');
        this.nextButton = document.getElementsByClassName('next');
        this.prevButton = document.getElementsByClassName('prev');
        this.songImg = document.querySelector('.song-img');
        this.songName = document.querySelector('.song-name');
        this.singer = document.querySelector('.singer');
        this.progress = document.querySelector('.progress-bar');
        this.bar = document.querySelector('.bar');
        this.mute = document.querySelector('.mute');
        this.iconMute = document.querySelector('.icon-mute');
        this.loop = document.querySelector('.loop');
        this.loopIcon = document.querySelector('.loop-icon');

        // actions
        this.playOrPause.addEventListener('click', this.playAndPause.bind(this));
        this.nextButton[0].addEventListener('click', this.next.bind(this));
        this.prevButton[0].addEventListener('click', this.prev.bind(this));
        this.bar.addEventListener('click', this.setProgress.bind(this));
        this.mute.addEventListener('click', this.muteUnmute.bind(this));
        this.loop.addEventListener('click', this.loopUnloop.bind(this));
    };

    playAndPause() {
        if (this.isPlaying == false) {
            this.isPlaying = true;
            this.playOrPauseIcon.setAttribute('src', './image/pause.png');
            this.audio.play();
            this.currentTime();
            this.rotateCover();
            this.updateProgressBar();
        } else {
            this.isPlaying = false;
            this.playOrPauseIcon.setAttribute('src', './image/play.png');
            this.audio.pause();
            clearInterval(this.onlineTime);
            clearInterval(this.rotateCurrent);
            clearInterval(this.progressBar);
        };
    };

    currentTime() {
        clearInterval(this.onlineTime);
        let minutes;
        let second;
        this.onlineTime = setInterval(() => {
            if (Math.floor(this.audio.currentTime / 60) <= 9) {
                minutes = '0' + Math.floor(this.audio.currentTime / 60);
            } else {
                minutes = Math.floor(this.audio.currentTime / 60);
            };
            if (Math.floor(this.audio.currentTime % 60) <= 9) {
                second = '0' + Math.floor(this.audio.currentTime % 60);
            } else {
                second = Math.floor(this.audio.currentTime % 60);
            };
            this.time[0].innerText = `${minutes}:${second}`;

        }, 1000);
    };

    totalTime() {
        let minutes;
        let second;
        setTimeout(() => {
            if (Math.floor(this.audio.duration / 60) <= 9) {
                minutes = '0' + Math.floor(this.audio.duration / 60);
            } else {
                minutes = Math.floor(this.audio.duration / 60);
            };
            if (Math.floor(this.audio.duration % 60) <= 9) {
                second = '0' + Math.floor(this.audio.duration % 60);
            } else {
                second = Math.floor(this.audio.duration % 60);
            };
            this.total[0].innerText = `${minutes}:${second}`;
        }, 50);
    };

    next() {
        (this.current < (songs.length - 1)) ? this.current++ : this.current = 0;
        this.audio.setAttribute('src', `${songs[this.current].song}`);
        this.songImg.setAttribute('src', `${songs[this.current].img}`);
        this.songName.innerText = `${songs[this.current].name}`;
        this.singer.innerText = `${songs[this.current].singer}`;
        this.isPlaying = false;
        this.rotate = 0;
        this.playAndPause();
        this.currentTime();
        this.totalTime();
    };

    prev() {
        (this.current > 0) ? this.current-- : this.current = (songs.length - 1);
        this.audio.setAttribute('src', `${songs[this.current].song}`);
        this.songImg.setAttribute('src', `${songs[this.current].img}`);
        this.songName.innerText = `${songs[this.current].name}`;
        this.singer.innerText = `${songs[this.current].singer}`;
        this.isPlaying = false;
        this.rotate = 0;
        this.playAndPause();
        this.currentTime();
        this.totalTime();
    };

    rotateCover() {
        clearInterval(this.rotateCurrent);
        this.rotateCurrent = setInterval(() => {
            this.songImg.style.transform = `rotate(${this.rotate++}deg)`;
        }, 20);
    };

    setProgress(event) {
        this.audio.currentTime = (event.offsetX / event.target.clientWidth) * this.audio.duration;
    };

    updateProgressBar() {
        clearInterval(this.progressBar);
        this.progressBar = setInterval(() => {
            let progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
            this.progress.style.width = `${progressPercent}%`;
            if (progressPercent == 100) {
                this.isPlaying == false;
                this.songImg.style.transform = `rotate(0deg)`;
                this.playAndPause();
            }
        }, 500);
    };

    muteUnmute() {
        if (this.audio.muted == true) {
            this.audio.muted = false;
            this.iconMute.setAttribute('src', './image/unmute.png');
        } else {
            this.audio.muted = true;
            this.iconMute.setAttribute('src', './image/mute.png');
        }
    };

    loopUnloop() {
        if (this.audio.loop == true) {
            this.audio.loop = false;
            this.loopIcon.setAttribute('src', './image/arrow.png');
        } else {
            this.audio.loop = true;
            this.loopIcon.setAttribute('src', './image/loop.png');
        }
    };

};

new musicPlayer(songs);