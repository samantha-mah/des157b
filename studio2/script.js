let globalData;
async function getData() {
    const daylist = await fetch('data/daylist.json');
    const data = await daylist.json();
    // console.log(data);
    globalData = data;
    document.querySelector('#music').innerHTML = outputHTML(data);
    document.querySelector('#picker').innerHTML = createSelectList(data);
}

function outputHTML (data) {
    let html = '<p>';
    html += `<p>At ${data.point1.time} I listened to ${[data.point1.mood]} while ${data.point1.activity}</p>`;
    html += '</p>';
    return html;
}

function createSelectList(data) {
    let html = `<option>---</option>`;
    const dataPoints = Object.keys(data);
    // console.log(dataPoints);
    dataPoints.forEach(function(eachPoint){
       html += `<option value="${eachPoint}">${data[eachPoint].time}</option>`;
    });
    return html;
}

document.querySelector('#picker').addEventListener('change', function() {
    const newValue = this.value;
    updateInterface(newValue, globalData);
});

function updateInterface(value, jsonData) {
    // console.log(value);
    let html = '<p>';
    html += `At ${jsonData[value].time} I was listening to ${[jsonData[value].mood]} while ${jsonData[value].activity}`;
    html += '</p>';
    document.querySelector('#result').innerHTML = html;
}

getData();