let globalData;
let currentPoint = 1;

async function getData() {
    const daylist = await fetch('data/daylist.json');
    const data = await daylist.json();
    //console.log(data);
    globalData = data;
    document.querySelector('#playlist').innerHTML = outputHTML(data);
}

function outputHTML (data) {
    let html = '<p>';
    html += `<p>At <span id="time">${data.point1.time}</span> I listened to <span id="daylist">${[data.point1.mood]}</span> while ${data.point1.activity}</p>`;
    html += '</p>';
    return html;
}

document.querySelector('.fa-forward-step').addEventListener('click', function() {
    console.log("clicked");
    if (currentPoint == 10 ) {
        currentPoint = 1;
    }
    
    currentPoint++;
    forwardInterface(currentPoint, globalData);
})

document.querySelector('.fa-backward-step').addEventListener('click', function() {
    console.log("clicked");
    const newValue = this.value;
    forwardInterface(newValue, globalData);
});

function forwardInterface(value, jsonData) {
    console.log(jsonData);
    const image = document.querySelector('#daylist');
    const dataPoint = `point${value}`;
    let html = '<p>';
    html += `At ${jsonData[dataPoint].time} I was listening to ${[jsonData[dataPoint].mood]} while ${jsonData[dataPoint].activity}`;
    html += '</p>';
    document.querySelector('#result').innerHTML = html;
    daylist.innerHTML = `<img id="daylist" src="images/1.jpg" alt="daylist 1">`;
}

getData();