  // Initialize Firebase
  var config = {
  	apiKey: "AIzaSyD-kTp3iIOnLAhh7TsiQSJ-1rJkSCDlJnY",
  	authDomain: "trainschedule-4733c.firebaseapp.com",
  	databaseURL: "https://trainschedule-4733c.firebaseio.com",
  	storageBucket: "trainschedule-4733c.appspot.com",
  	messagingSenderId: "382103491835"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  database.ref().on("child_added", function (snapshot) {
  	"use strict";
  	//console.log(snapshot.child("name").val());

  	var newTrain = snapshot.child("name").val();
  	var newDestination = snapshot.child("destination").val();
  	var newFrequency = snapshot.child("frequency").val();
  	var nextArrival = null;
  	var minAway = null;

  	var newStart = snapshot.child("startTime").val();
  	newStart = moment(newStart, "HH:mm");
  	console.log(newStart);

  	var currentTime = moment();
  	currentTime = moment.unix(currentTime);
  	console.log(currentTime);

  	var temp = newStart;

  	do {
  		temp += moment().add(newFrequency);

  	} while (temp <= currentTime);
  	temp = moment(temp).format("HH:mm");
  	console.log(temp);



  	//var timeDifference = moment.diff(newStart);
  	//console.log(timeDifference);

  	var entry = "<tr><td>" + newTrain + "</td><td>" + newDestination + "</td><td>" + newFrequency + "</td><td>" + nextArrival + "</td>" + "<td>" + minAway + "</td>";

  	$("#trainTable").append(entry);

  });

  $("#submitButton").on("click", function () {
  	"use strict";

  	var trainName = $("#trainName").val().trim();
  	console.log(trainName);

  	var trainDestination = $("#trainDestination").val().trim();
  	console.log(trainDestination);

  	var trainFrequency = $("#trainFrequency").val();
  	console.log(trainFrequency);

  	var trainStart = $("#trainStart").val();
  	console.log(trainStart);

  	database.ref().push({
  		name: trainName,
  		destination: trainDestination,
  		startTime: trainStart,
  		frequency: trainFrequency
  	});
  	return false;
  });
