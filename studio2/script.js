let globalData;
async function getData() {
    const daylist = await fetch('data/daylist.json');
    const data = await daylist.json();
    console.log(data);
    globalData = data;
    document.querySelector('#playlist').innerHTML = outputHTML(data);
}

function outputHTML (data) {
    let html = '<p>';
    html += `<p>At <span id="time">${data.point1.time}</span> I listened to <span id="daylist">${[data.point1.mood]}</span> while ${data.point1.activity}</p>`;
    html += '</p>';
    return html;
}

document.querySelector('#fa-forward-step').addEventListener('click', function() {
    const newValue = this.value;
    forwardInterface(newValue, globalData);
})

document.querySelector('#fa-backward-step').addEventListener('change', function() {
    const newValue = this.value;
    forwardInterface(newValue, globalData);
});

function forwardInterface(value, jsonData) {
    // console.log(value);
    const image = document.querySelector('#daylist');
    let html = '<p>';
    html += `At ${jsonData[value].time} I was listening to ${[jsonData[value].mood]} while ${jsonData[value].activity}`;
    html += '</p>';
    document.querySelector('#result').innerHTML = html;
    daylist.innerHTML = `<img id="daylist" src="images/1.jpg" alt="daylist 1">`;
}

getData();