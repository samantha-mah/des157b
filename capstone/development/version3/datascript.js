// JS here
Parse.initialize("x8pe5MVzOB0aP6AEgUIqcBcoaYCttI8wHaipLfZ5","9NnD7F8ySbT4z5ZQFp7Abnshl4dP2il7Mvvh5vCC");
Parse.serverURL = 'https://parseapi.back4app.com/';

//Get the record ID from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const recordId = urlParams.get('id');
//alert(recordId);

//add variables for where to stick the content on the page
const a1 = document.querySelector('#a1');
const a2 = document.querySelector('#a2');
const a3 = document.querySelector('#a3');
const a4 = document.querySelector('#a4');
const a5 = document.querySelector('#a5');
const a6 = document.querySelector('#a6');

// This function asychronously gets the data from the record and puts it on the page
async function retrieveRecord(recordId) {
    // Create a query for the specific class (in this case I named the table Records)
    const DataObject = Parse.Object.extend("Records");
    const query = new Parse.Query(DataObject);

    try {
        // Get the object by ID
        const dataObject = await query.get(recordId);

        // Retrieve the data
        const file1 = dataObject.get("q1");
        const text1 = dataObject.get("q2");
        const text2 = dataObject.get("q3");
        const text3 = dataObject.get("q4");
        const text4 = dataObject.get("q5");
        const text5 = dataObject.get("q6");


        a1.innerHTML =`<img src="${file1.url()}" alt="image 1">`;
        a2.innerHTML =`<audio id="my-audio" controls>
        <source src="audio/${text1}.mp3" type="audio/mpeg">
        </audio>`;
        a3.innerHTML =`${text2}`;
        a4.innerHTML =`${text3}`;
        a5.innerHTML =`${text4}`;
        a6.innerHTML =`${text5}`;

        
    } catch (error) {
        console.error("Error while retrieving record: " + error.message);
    }
}

// This if statement makes sure the retrieveRecord function ony runs if an id is there
// Probably more should be done to handle errors here.
if(recordId){
    retrieveRecord(recordId);
}

const results = window.location;

console.log(results);

const shareLink = document.querySelector('button');

shareLink.addEventListener('click', function(event) {
  event.preventDefault();
  console.log("clicked");
  alert(`To share this page, copy this link, ${results}`);
})

var isAudioPlayed = false;

function playAudio() {
    isAudioPlayed = true;
    const myAudio = document.getElementById("my-audio");
    myAudio.play();
}


document.body.onclick = ()=>{
    if(isAudioPlayed) return ;
    playAudio();
}

const muteBtn = document.querySelector('.fa-volume-xmark');
const unmuteBtn = document.querySelector('.fa-volume-low');
const myAudio = document.getElementById("my-audio");

unmuteBtn.addEventListener('click', function() {
    myAudio.muted = false;
    myAudio.volume = 0.5;
    muteBtn.className = 'hidden fa-solid fa-volume-xmark';
    unmuteBtn.className = 'showing fa-solid fa-volume-low';
    muteBtn.style.zIndex = "10";
});

muteBtn.addEventListener('click', function() {
    myAudio.muted = true;
    myAudio.volume = 0;
    muteBtn.className = 'showing fa-solid fa-volume-xmark';
    unmuteBtn.className = 'hidden fa-solid fa-volume-low';
    unmuteBtn.style.zIndex = "10";
})
