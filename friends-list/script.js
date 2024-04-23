// JS here
Parse.initialize("N0hS7PSQl39F0pQWo0LG6KjyZuZ9hUAgQCvWyf5T","sVisr5OfN8XZwGcvC9AxrlsTmSH4jFxYxGq1RQwT");
Parse.serverURL = 'https://parseapi.back4app.com/';

(function() {
    'use strict';
    console.log("testing");
    const newBtn = document.getElementById("newbtn");
    const editBtns = document.querySelectorAll(".fa-edit");
    const addFriendForm = document.getElementById("add-friend");
    const editFriendForm = document.getElementById("edit-friend");
    const friendList = document.querySelector('main ol');

    newBtn.addEventListener('click', function(event) {
        event.preventDefault();
        addFriendForm.className = 'add-friend-onscreen';
    });

    addFriendForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addFriendForm.className = 'add-friend-offscreen';
    });

    for(let i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener('click', function(event) {
            event.preventDefault();
            editFriendForm.className = 'edit-friend-onscreen';
        })
    }

    editFriendForm.addEventListener('submit', function(event) {
        event.preventDefault();
        editFriendForm.className = 'edit-friend-offscreen';
    });

    async function displayFriends() {
        const friends = Parse.Object.extend('Friends');
        const query = new Parse.Query(friends);
        const results = await query.ascending('lname').find();
        console.log(results);

        results.forEach(function(eachFriend) {
            const id = eachFriend.id;
            const lname = eachFriend.get('lname');
            const fname = eachFriend.get('fname');
            const email = eachFriend.get('email');
            const facebook = eachFriend.get('facebook');
            const twitter = eachFriend.get('twitter');
            const instagram = eachFriend.get('instagram');
            const linkedin = eachFriend.get('linedin');

            const theListItem = document.createElement('li');
            theListItem.setAttribute('id', `r-${id}`);
            theListItem.innerHTML = `<div class="name">
                ${fname} ${lname}
            </div>
            <div class="email">
                <i class="fas fa-envelope-square"></i> ${email}
            </div>
            <div class="social">
                <a href="${facebook}"><i class="fab fa-facebook-square"></i></a>
                <a href="${twitter}"><i class="fab fa-twitter-square"></i></a>
                <a href="${instagram}"><i class="fab fa-instagram"></i></a>
                <a href="${linkedin}"><i class="fab fa-linkedin"></i></a>
            </div>
            <i class="fas fa-edit"></i>
            <i class="fas fa-times-circle"></i>`;

        friendList.append(theListItem);

        });
    }

    displayFriends();
})();

