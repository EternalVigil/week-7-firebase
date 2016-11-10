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
	//grabs values from Firebase to complete trainTable values
  	var newTrain = snapshot.child("name").val();
  	var newDestination = snapshot.child("destination").val();
  	var newFrequency = snapshot.child("frequency").val();
  	var nextArrival = null;
  	var minAway = null;

	//grabs value from Firebase of starting time for train to calculate train schedule arrival times
  	var newStart = snapshot.child("startTime").val();  
	console.log("startTime from Database: " + newStart);
	
	//parse startTime value into moment.js format to convert into Unix milliseconds timecode based on daily schedules
	var parseTime = newStart.split();
  	var todayHour = parseTime[0];
  	var todayMin = parseTime[1];
	  
	//converts frequency into milliseconds to create train interval time
	var frequencyInterval = newFrequency * 60000;
	var tempTime = moment({
  		hour: todayHour,
  		minute: todayMin
  	});
  	tempTime = moment(tempTime).unix();
  	console.log("time from database: " + tempTime);
	console.log("which translates to " + moment(tempTime).format("HH:mm"));
	
	//grabs current time and converts to Unix format
  	var currentTime = moment();
  	currentTime = moment(currentTime).unix();
  	console.log("current time: " + currentTime);
	console.log("which translates to " + moment(currentTime).format("HH:mm"));

	//loop until tempTime <= current Time to calculate for time til next train
  	do {
  		tempTime += frequencyInterval;
		console.log("the current time is " + moment(tempTime).format("HH:mm"))

  	} while (tempTime < currentTime);
	
	var timeDiff = moment(tempTime).diff(currentTime);
  	tempTime = moment(tempTime).format("HH:mm");
  	//console.log(tempTime);
	  timeDiff = moment(timeDiff).format("mm")
	  console.log(timeDiff);
	  nextArrival = tempTime;
	  minAway = timeDiff;
	  
	//create entry string and appends to trainTable
  	var entry = "<tr><td>" + newTrain + "</td><td>" + newDestination + "</td><td>" + newFrequency + "</td><td>" + nextArrival + "</td>" + "<td>" + minAway + "</td>";
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
