//globals
var currentMenu, energy, strength, defense, level; 

//sets the firebase configuration
var config = {
    apiKey: "AIzaSyBBHh-TxeEx9bDqVgxAIhj8ZzOtP3QY_ic",
    authDomain: "nutramon-742f2.firebaseapp.com",
    databaseURL: "https://nutramon-742f2.firebaseio.com",
    storageBucket: "nutramon-742f2.appspot.com",
    };

// Initialize Firebase
firebase.initializeApp(config);

var database = firebase.database(); 

var ref = database.ref();

//sets the player stats variables to what is stored on the database 

 ref.on('value',function(snapshot){
        energy = snapshot.val().energy; 
        strength = snapshot.val().strength; 
        defense = snapshot.val().defense; 
        speed = snapshot.val().speed; 
        level = snapshot.val().level; 
        }, function (errorObject) {

		// throwing an error if the database request fails 
	  	console.log("The read failed: " + errorObject.code);
	
	})



