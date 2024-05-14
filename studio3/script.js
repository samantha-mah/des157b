// Animate on Scroll
AOS.init({
    duration: 1200,
});

// Scroll to card
function scrollFunction() {

    const card = document.querySelector('#card');

    card.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
    });
};

// JS here
Parse.initialize("LjaN0AaAlVisq20wmpl4XlbghWz1LAFHVidMYSNb","3FHTRYEzDk53eEwQfxftjla9Flp8hNcewUJOzsFx");
Parse.serverURL = 'https://parseapi.back4app.com/';

(function(){
    'use strict';
  
    // Global Variables...
    let imgOrientation;
    let resizedImg = false;
    let title;
    let description;
    let file;
  
    document.querySelector('#upload').addEventListener('submit', function(event){
      event.preventDefault();
      title = document.querySelector('#title').value;
    //   description = document.querySelector('#description').value;
  
      const fileUpload = document.querySelector('#fileupload');
      if (fileUpload.files.length > 0) {
          file = fileUpload.files[0];
          const name = fileUpload.files[0].name;
          const type = fileUpload.files[0].type;
          if(type == 'image/jpeg' || type == 'image/png'){
            // Get the data URL of the image as a string
            const fileAsDataURL = window.URL.createObjectURL(file);
            handleImg(fileAsDataURL, name, imgOrientation);
          } else { alert('the file is not a .jpg or .png file'); }
      }
    });
  
    async function handleImg(imageUrl, name, imgOrientation){
      const dimensions = await getHeightAndWidthFromDataUrl(imageUrl);
      //console.log(dimensions.height, dimensions.width);
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
      let squareThumb;
      // make a square thumbnail for any image...
      const image = await Jimp.read(imageUrl);
      image.cover(250, 250).getBase64('image/jpeg', (err, result) => {
          if(err){
              console.log(err);
          } else {
            squareThumb = result;
          }
      });
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
        document.querySelector('#resized-img img').src = resizedImg;
      } else {
        // if it doesn't need to be resized, just show the image
        resizedImg = imageUrl;
        document.querySelector('#resized-img img').src = resizedImg;
        // this is set to false so that images that are not resized
        // are handled properly in the upload function.
        resizedImg = false;
      }
      document.querySelector('#square-img img').src = squareThumb;
      uploadData(name, file, resizedImg, squareThumb, title, description);
    }
  
    async function uploadData(name, originalFile, resizedFile, squareThumb, title, description){
      const myNewObject = new Parse.Object('photos');
      myNewObject.set('filename', name);
      // handle images that have been resized...
      if(resizedFile){
        myNewObject.set('resizedfile', new Parse.File(name, { base64: resizedFile }));
      } else { // handle images that have not been resized.
        myNewObject.set('resizedfile', new Parse.File(name, originalFile));
      }
  
      myNewObject.set('squarethumb', new Parse.File(name, { base64: squareThumb }));
      myNewObject.set('title', title);
      myNewObject.set('description', description);
      try {
        const result = await myNewObject.save();
      } catch (error) {
        console.error('Error while creating pictures: ', error);
      }
      document.querySelector('#title').innerHTML = "<p>`title`</p>";
    }
  
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
    });
  })();