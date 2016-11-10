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
  	//grabs values from Firebase to complete trainTable values
  	var newTrain = snapshot.child("name").val();
  	var newDestination = snapshot.child("destination").val();
  	var newFrequency = snapshot.child("frequency").val();
  	var nextArrival = null;
  	var minAway = null;

  	//grabs value from Firebase of starting time for train to calculate train schedule arrival times
  	var newStart = snapshot.child("startTime").val();

  	//parse startTime value into moment.js format to convert into Unix milliseconds timecode based on daily schedules
  	var parseTime = newStart.split(":");
  	var todayHour = parseTime[0];
  	var todayMin = parseTime[1];
  	var tempTime = moment({
  		hour: todayHour,
  		minute: todayMin
  	});
  	tempTime = moment.unix(tempTime / 1000000);

  	//converts frequency into milliseconds to create train interval time
  	var frequencyInterval = newFrequency * 60;


  	//grabs current time and converts to Unix format
  	var currentTimeUnix = moment().unix();


  	//loop until tempTime <= current Time to calculate for time til next train
  	for (var i = 0; tempTime <= currentTimeUnix; i++) {
  		tempTime = tempTime + frequencyInterval;
  	}
  	nextArrival = tempTime;
  	//calculates minutes left until next train arrives
  	var timeDiff = (tempTime - currentTimeUnix) / 60;
  	timeDiff = parseInt(timeDiff);
  	nextArrival = moment.unix(tempTime).format("HH:mm");

  	//create entry string and appends to trainTable
  	var entry = "<tr><td>" + newTrain + "</td><td>" + newDestination + "</td><td>" + newFrequency + "</td><td>" + nextArrival + "</td>" + "<td>~" + timeDiff + "</td>";
  	$("#trainTable").append(entry);

  });

  //creates on click functionality to submit user input values to Firebase database
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
