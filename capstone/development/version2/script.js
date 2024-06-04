alert("You are a college student who wants to capture memories from the present for your future self and future generations to look back on. Read about this interactive project, and complete the fields to create your time capsule.");

const answers = [];

const element = document.querySelector("main");

// element.addEventListener('wheel', (event) => {
//   event.preventDefault();

//   element.scrollBy({
//     left: event.deltaY < 0 ? -10 : 10,
    
//   });
// });

// Animate on Scroll
AOS.init({
  duration: 1200,
});

// Scroll to card
const start = document.querySelector('#start');

start.addEventListener('click', function(e) {

  e.preventDefault();
  
  const q1 = document.querySelector('#q1');

  q1.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest"
  });
})

const back1 = document.querySelector("#back1");
const back2 = document.querySelector("#back2");
const back3 = document.querySelector("#back3");
const back4 = document.querySelector("#back4");
const back5 = document.querySelector("#back5");

back1.addEventListener('click', function(e) {
  e.preventDefault();

  start.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center"
  });

})

back2.addEventListener('click', function(e) {
  e.preventDefault();

  form1.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center"
  });

})

back3.addEventListener('click', function(e) {
  e.preventDefault();

  form2.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center"
  });

});

back4.addEventListener('click', function(e) {
  e.preventDefault();

  form3.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center"
  });

})

back5.addEventListener('click', function(e) {
  e.preventDefault();

  form4.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center"
  });

})

// if user doesn't provide input
const button1 = document.querySelector("#submit1");
const button2 = document.querySelector("#submit2");
const button3 = document.querySelector("#submit3");
const button4 = document.querySelector("#submit4");
const button5 = document.querySelector("#submit5");
const button6 = document.querySelector("#submit6");

// const textFields = document.querySelectorAll('input[type=text]');

// button1.addEventListener('click', function(event) {
//   event.preventDefault();
//   console.log("clicked");

//   const q1 = document.querySelector('#question1').value;

//   if(q1 == "") {
//     const error1 = document.querySelector("#error1");
//     error1.innerHTML = "Please provide an input";
//     // error1.setAttribute("class", "error");
//     document.querySelector("#question1").focus();
//   }
  
//   else {
//     document.querySelector("#a1").innerHTML = q1;
//     // document.querySelector("#a1").className = ("user-input");

//     const q2 = document.querySelector('#q2');

//     q2.scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//         inline: "nearest"
//     });
//   }
// });

function moveForward(thisElement, nextElement, thisError){
  const thisQuestion = document.querySelector(`#${thisElement}`).value;
  console.log(thisQuestion);

  if(thisQuestion == "") {
    const error = document.querySelector(`#${thisError}`);
    error.innerHTML = "Please provide an input";
    document.querySelector(`#${thisElement}`).focus();
  }
  
  else {
    answers.push(thisQuestion);

    const nextQuestion = document.querySelector(`#${nextElement}`);

    nextQuestion.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
    });
  }
}

button1.addEventListener('click', function(event) {
  event.preventDefault();
  console.log("clicked");

  moveForward('question1', 'q2', 'error1');
});

button2.addEventListener('click', function(event) {
  event.preventDefault();
  console.log("clicked");

  moveForward('q2', 'q3', 'error2');
});

button3.addEventListener('click', function(event) {
  event.preventDefault();
  console.log("clicked");

  moveForward('q3', 'q4', 'error3');
});

button4.addEventListener('click', function(event) {
  event.preventDefault();
  console.log("clicked");

  moveForward('q4', 'q5', 'error4');
});

button5.addEventListener('click', function(event) {
  event.preventDefault();
  console.log("clicked");

  moveForward('q5', 'q6', 'error5');
});

button6.addEventListener('click', function(event) {
  event.preventDefault();
  console.log("clicked");

  moveForward('q6', 'error6');
});


// JS here
Parse.initialize("x8pe5MVzOB0aP6AEgUIqcBcoaYCttI8wHaipLfZ5","9NnD7F8ySbT4z5ZQFp7Abnshl4dP2il7Mvvh5vCC");
Parse.serverURL = 'https://parseapi.back4app.com/';

// Resizing image
(function(){
  'use strict';

  // Global Variables...
  let imgOrientation;
  let resizedImg = false;
  let file;

  const submissionList = document.querySelector('section article div');

  document.querySelector('#form1').addEventListener('submit', function(event){
    event.preventDefault();
    
    const question5 = document.querySelector('#question5');
    if (question5.files.length > 0) {
        file = question5.files[0];
        const name = question5.files[0].name;
        const type = question5.files[0].type;
        
        if(type == 'image/jpeg' || type == 'image/png'){
          // Get the data URL of the image as a string
          const fileAsDataURL = window.URL.createObjectURL(file);
          console.log(fileAsDataURL);
          handleImg(fileAsDataURL, name, imgOrientation);
        } else { alert('the file is not a .jpg or .png file'); }
    }

    displaySubmissions();

  });

  async function handleImg(imageUrl, name, imgOrientation){
    //console.log('in here');
    const dimensions = await getHeightAndWidthFromDataUrl(imageUrl);
    
    console.log(dimensions.height, dimensions.width);
    // if image is small enough and does not need to be resized...
    if( dimensions.height < 800 && dimensions.width < 1000 ){
      resizedImg = false;
      imgOrientation = 'not needed';
      resizeImg(imageUrl, name, imgOrientation);
    } else {
      // Image is in portrait mode
      if( dimensions.height > dimensions.width ){
        resizedImg = true;
        imgOrientation = 'tall';
        resizeImg(imageUrl, name, imgOrientation);
      // image is in landscape mode
      } else if ( dimensions.width > dimensions.height ){
        resizedImg = true;
        imgOrientation = 'wide';
        
        resizeImg(imageUrl, name, imgOrientation)
      }
      // image is square...
      else {
        imgOrientation = 'wide';
        resizeImg(imageUrl, name, imgOrientation);
      }
    }
  }

  async function resizeImg(imageUrl, name, imgOrientation){
    
    /* let squareThumb;
    // make a square thumbnail for any image...
    const image = await Jimp.read(imageUrl);
    image.cover(250, 250).getBase64('image/jpeg', (err, result) => {
        if(err){
            console.log(err);
        } else {
          squareThumb = result;
          //console.log(squareThumb);
        }
    }); */
    // if the image needs to be resized...
    if(resizedImg == true){
      const image2 = await Jimp.read(imageUrl);
      // resize portrait and square images
      if( imgOrientation == 'tall' || imgOrientation == 'square'){
        image2.resize(Jimp.AUTO, 800).getBase64('image/jpeg', (err, result) => {
          if(err){
            console.log(err);
          } else {
            resizedImg = result;
          }
        });
      } else {
        // resize landscape images
        image2.resize(1000, Jimp.AUTO).getBase64('image/jpeg', (err, result) => {
          if(err){
              console.log(err);
          } else {
              resizedImg = result;
          }
        });
      }
    } else {
      // if it doesn't need to be resized, just show the image
      resizedImg = imageUrl;
      //document.querySelector('#resized-img img').src = resizedImg;
      // this is set to false so that images that are not resized
      // are handled properly in the form function.
      resizedImg = false;
    }
    //document.querySelector('#square-img img').src = squareThumb;

    // Original version with squareThumbnails
    //formData(name, file, resizedImg, squareThumb);

    formData(name, file, resizedImg);
    
  }

  async function formData(name, originalFile, resizedFile){
    const myNewObject = new Parse.Object('photos');
    myNewObject.set('filename', name);
    // handle images that have been resized...
    if(resizedFile){
      myNewObject.set('resizedfile', new Parse.File(name, { base64: resizedFile }));
    } else { // handle images that have not been resized.
      myNewObject.set('resizedfile', new Parse.File(name, originalFile));
    }
    
    try {
      const result = await myNewObject.save();

      // Clear out the submissionList and set it again with the new image included...
      submissionList.innerHTML='';
      displaySubmissions();
    } catch (error) {
      console.error('Error while creating pictures: ', error);
    }
  }


  // Original version
  /* async function formData(name, originalFile, resizedFile, squareThumb){
    const myNewObject = new Parse.Object('photos');
    myNewObject.set('filename', name);
    // handle images that have been resized...
    if(resizedFile){
      myNewObject.set('resizedfile', new Parse.File(name, { base64: resizedFile }));
    } else { // handle images that have not been resized.
      myNewObject.set('resizedfile', new Parse.File(name, originalFile));
    }

    myNewObject.set('squarethumb', new Parse.File(name, { base64: squareThumb }));
    try {
      const result = await myNewObject.save();

      // Clear out the submissionList and set it again with the new image included...
      submissionList.innerHTML='';
      displaySubmissions();
    } catch (error) {
      console.error('Error while creating pictures: ', error);
    }
  } */

  // Helper function 
  // this came off of stack overflow. I tried to rewrite it in a more readable
  // way, but I have not been successful yet.
  const getHeightAndWidthFromDataUrl = dataURL => new Promise(resolve => {
    
    const img = new Image();
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width
      });
    }
    img.src = dataURL;
    //console.log('received dimensions');
  });

  // Get URL for photo
  async function getNewPhoto(photoId){
    // which "object" are we dealing with (database table)
    const records = Parse.Object.extend('photos');
    // make a new query
    const query = new Parse.Query(records);
    // Find the record you just added
    query.equalTo("objectId", photoId);
    try{
      // results holds the whole record and meta data about the record
      const results = await query.find();
      // The .get() method gets a speficif field. The url() method is special for files
      const photoURL = results[0].get('file').url();
      // get the photo file name from the filename field
      const photoName = results[0].get('filename');
      // pass both values into the showformedPhoto function
      showformedPhoto(photoURL, photoName);
    } catch (error) {
        console.error('Error while getting photo', error);
    } 
  }

  // Display all submissions
  async function displaySubmissions() {
    const photos = Parse.Object.extend('photos');
    const query = new Parse.Query(photos);
    const results = await query.ascending('createdAt').find();
    //const submissionList = document.querySelector('main section');
    //console.log(results);

    results.forEach(function(submission) {
        const id = submission.id;
        const squarethumb = submission.get('squarethumb').url();

        const theSubmissionItem = document.createElement('div');
        theSubmissionItem.setAttribute('id', `r-${id}`);
        /* theSubmissionItem.innerHTML =
        
        `<div class="titlename">
          <h2>${title}</h2>
        </div>
        <div class="photo">
          <img src="${squarethumb}" alt="${title}">
        </div>`; */

        theSubmissionItem.innerHTML =`
          <img src="${squarethumb}" alt="${squarethumb}">`;

    submissionList.append(theSubmissionItem);
    //console.log(squarethumb);

    });
  }

  // displaySubmissions();

})();