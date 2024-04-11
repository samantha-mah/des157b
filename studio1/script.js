(function (){
    'use strict';

    const fs = document.querySelector('.fa-expand');

    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');
    const line4 = document.querySelector('#line4');

    const intervalID = setInterval(checkTime, 1000);

    fs.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        }

        else {
            document.exitFullscreen();
        }
    })

    function checkTime() {
        if (1 < myVideo.currentTime && myVideo.currentTime < 5) {
            line1.className = "showing";
        }

        else {
            line1.className = "hidden";
        }
         
        if (5 < myVideo.currentTime && myVideo.currentTime < 10) {
            line2.className = "showing";
        }

        else {
            line2.className = "hidden";
        }

        if (10 < myVideo.currentTime && myVideo.currentTime < 15) {
            line3.className = "showing";
        }

        else {
            line3.className = "hidden";
        }

        if (15 < myVideo.currentTime && myVideo.currentTime < 20) {
            line4.className = "showing";
        }

        else {
            line4.className = "hidden";
        }
    }
}());