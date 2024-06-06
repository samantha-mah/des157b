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
        const text1 = dataObject.get("q1");
        const text2 = dataObject.get("q2");
        const file1 = dataObject.get("q3");
        const text4 = dataObject.get("q4");
        const file2 = dataObject.get("q5");


        a1.innerHTML =`<img src="${file1.url()}" alt="image 1">`;
        a2.innerHTML =`a2 ${text2}`;
        a3.innerHTML =`a3 ${text3}`;
        a4.innerHTML =`a4 ${text4}`;
        a5.innerHTML =`a5 ${text5}`;
        atob6.innerHTML =`a6 ${text6}`;

        
    } catch (error) {
        console.error("Error while retrieving record: " + error.message);
    }
}

// This if statement makes sure the retrieveRecord function ony runs if an id is there
// Probably more should be done to handle errors here.
if(recordId){
    retrieveRecord(recordId);
}