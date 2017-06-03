$(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCnD5bCZmtc4ETlLf39vUqzfvIxRA9UEhA",
        authDomain: "cursus-honorum.firebaseapp.com",
        databaseURL: "https://cursus-honorum.firebaseio.com",
        projectId: "cursus-honorum",
        storageBucket: "cursus-honorum.appspot.com",
        messagingSenderId: "1091627596993"
    };
    firebase.initializeApp(config);

    //Fill the leaderboard with the data
    var i = 14;
    var database = firebase.database();
    var leaders = database.ref().child('Leaders');

    leaders.orderByChild('Score').limitToLast(13).on('child_added', snap => {
        var name = snap.child('Name').val();
        var score = snap.child('Score').val();
        i--;
        if(i==1) {
            addItem('Dictator:', name, score);
        } else if(i==2 || i==3) {
            addItem('Censor:', name, score);
        } else if(i==4 || i==5) {
            addItem('Consul:', name, score);
        } else {
            addItem('Praetor:', name, score);
        }
    });

    function addItem(keyword, name, score) {
        $('div.container').prepend('<div class="item"><div class="title"><span class="number">' + i +'.</span>' + keyword + '</div><div class="name">' + name + '</div><div class="score">' + score + '</div></div>');
    }

});
