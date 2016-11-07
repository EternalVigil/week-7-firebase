  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB64qCJWi7vneDYqIGekyCX8OIrQZyKjXY",
    authDomain: "employeedata-48659.firebaseapp.com",
    databaseURL: "https://employeedata-48659.firebaseio.com",
    storageBucket: "employeedata-48659.appspot.com",
    messagingSenderId: "926004869636"
  };
  firebase.initializeApp(config);

var database = firebase.database();

    database.ref().on("child_added", function(snapshot){
        "use strict";
        //console.log(snapshot.child("name").val());
        
        var newName = snapshot.child("name").val();
        var newRole = snapshot.child("role").val();
        var newDate = snapshot.child("startDate").val();
        var newRate = snapshot.child("monthlyRate").val();
        var monthsWorked = moment().diff(newDate, "months");
        var totalEarned = monthsWorked * newRate;
        
        var entry = "<tr><td class='nameCell'>" + newName + "</td><td class='roleCell'>" + newRole + "</td><td class='dateCell'>" + newDate + "</td><td class='monthCell'>" + monthsWorked + "</td><td class='rateCell'>" + newRate + "</td><td class='totalCell'>$" + totalEarned + "</td></tr>";
        
        $("#employeeTable").append(entry);
        
    });

$("#submitButton").on("click", function(){
"use strict";

var employeeName = $("#employeeName").val().trim();
console.log(employeeName);

var employeeRole = $("#employeeRole").val().trim();
console.log(employeeRole);

var startDate = $("#employeeStartDate").val();
console.log(startDate);

var monthlyRate = $("#employeeRate").val();
console.log(monthlyRate);

    database.ref().push({
        name: employeeName,
        role: employeeRole,
        startDate: startDate,
        monthlyRate: monthlyRate
    });
    return false;
});

