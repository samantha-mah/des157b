(function (){
    'use strict';

    const fs = document.querySelector('.fa-expand');
    const volume = document.querySelector('.fa-volume-xmark');
    const video = document.querySelector('#myVideo');
    const controls = document.querySelector("#controls");

    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');
    const line4 = document.querySelector('#line4');

    const intervalID = setInterval(checkTime, 1000);

    let mode = "muted"

    fs.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        }

        else {
            document.exitFullscreen();
        }
    });

    volume.addEventListener('click', function() {
        if (mode === 'muted') {
            video.volume = 0.5;
            controls.innerHTML = `<i class="fa-solid fa-volume-low"></i>`;
            mode = 'unmuted';

        } else {
            video.volume = 0.5;
            controls.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
            mode = 'muted'
        }
    });

    function checkTime() {
        if (0 < myVideo.currentTime && myVideo.currentTime < 3) {
            line1.className = "showing";
        }

        else {
            line1.className = "hidden";
        }
         
        if (3 < myVideo.currentTime && myVideo.currentTime < 6) {
            line2.className = "showing";
        }

        else {
            line2.className = "hidden";
        }

        if (6 < myVideo.currentTime && myVideo.currentTime < 9) {
            line3.className = "showing";
        }

        else {
            line3.className = "hidden";
        }

        if (9 < myVideo.currentTime && myVideo.currentTime < 12) {
            line4.className = "showing";
        }

        else {
            line4.className = "hidden";
        }
    }
}());