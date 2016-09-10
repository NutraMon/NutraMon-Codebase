// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBBHh-TxeEx9bDqVgxAIhj8ZzOtP3QY_ic",
    authDomain: "nutramon-742f2.firebaseapp.com",
    databaseURL: "https://nutramon-742f2.firebaseio.com",
    storageBucket: "nutramon-742f2.appspot.com",
  };
  firebase.initializeApp(config);

var database = firebase.database(); 
var ref = database.ref(); 

ref.set(); 

