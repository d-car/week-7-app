// Initialize Firebase
var config = {
  apiKey: "AIzaSyDcg7G7FCEwK1DLhuQYYC0Ge9-N5dqfGmY",
  authDomain: "week-7-train-b61c9.firebaseapp.com",
  databaseURL: "https://week-7-train-b61c9.firebaseio.com",
  projectId: "week-7-train-b61c9",
  storageBucket: "week-7-train-b61c9.appspot.com",
  messagingSenderId: "569981737817"
};

firebase.initializeApp(config);
var database = firebase.database();

function clearInputs() {
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
}

function displayTime() {
  var time = moment().format('HH:mm:ss');
  $('#currentTime').html(time);
  setTimeout(displayTime, 1000);
}

// database.ref().on("child_added", function(snapshot) {
  
//   // Get reference to existing tbody element, create a new table row element
//   var tBody = $("tbody");
//   var tRow = $("<tr>");
  

//   // Methods run on jQuery selectors return the selector they we run on
//   // This is why we can create and save a reference to a td in the same statement we update its text
//   var trainNameTd = $("<td>").text(snapshot.val().trainName);
//   var trainDestinationTd = $("<td>").text(snapshot.val().trainDestination);
//   var trainFrequencyTd = $("<td>").text(snapshot.val().trainFrequency);
//   var trainBeginTd = $("<td>").text(snapshot.val().trainBegin);


  
 


//   // Append the newly created table data to the table row
//   tRow.append(trainNameTd, trainDestinationTd, trainFrequencyTd,);
//   //  nextTrainTd, minutesAwayTd);

//   // Append the table row to the table body
//   tBody.append(tRow);

// });

// Capture Button Click
$("#submit").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text-boxes
  var trainName = $("#name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainBegin = $("#start-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();
  
  clearInputs();

  //Add clock to page
  // var fixTime = moment(time, "hh:mm").subtract(1, "years");
  // var currentMinute = moment();
  // //append to html
  // $("#currentTime").html(" Current Time : " + currentMinute.format("hh:mm"));

  // var timeDifference = moment().diff(moment(fixTime), "minutes");
  // var timeRemaining = timeDifference % trainFrequency
  // var minutesAway = trainFrequency - timeRemaining;
  // var nextTrain = moment().add(minutesAway, "minutes")
  // var arrivalTime = moment(nextTrain).format("HH:mm");
  
  // console.log(trainName);
  // console.log(trainDestination)
  // console.log(trainBegin)
  // console.log(trainFrequency)
  // console.log(nextTrain);
  // console.log(arrivalTime);
  // console.log(minutesAway);

  // Code for "Setting values in the database"
  database.ref().push({
    trainName: trainName,
    trainDestination: trainDestination,
    trainBegin: trainBegin,
    trainFrequency: trainFrequency,
  });
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());


  //create new variables for clean build from childSnapshot of data from firebase

  var name = childSnapshot.val().trainName;
  var destination = childSnapshot.val().trainDestination;
  var frequency = childSnapshot.val().trainFrequency;
  var time = childSnapshot.val().arrivalTime;


  //code in math to find the next train time and minutes until next arrival based off of frequency value and first train time value.

  // convert first train time back a year to make sure it is set before current time before pushing to firebase.

  var fixTime = moment(time, "HH:mm").subtract(1, "years");
  console.log(fixTime);

  //set a variable equal to the current time from moment.js

  var currentTime = moment();
  console.log("Current Time: " + moment(currentTime).format("HH:mm"));

  //post current time to div for reference

  $("#currentTime").html("Current Time: " + moment(currentTime).format("HH:mm"));

  //find the difference between the first train time and the current time

  var timeDiff = moment() - frequency;
  console.log("Difference In Time: " + timeDiff);

  //find the time apart by finding the remainder of the time difference and the frequency - use modal to get whole remainder number

  var timeRemainder = timeDiff % frequency;
  console.log(timeRemainder);

  //find the minutes until the next train

  var nextTrainMin = frequency - timeRemainder;
  console.log("Minutes Till Train: " + nextTrainMin);

  //find the time of the next train arrival

  var nextTrainAdd = moment().add(nextTrainMin, "minutes");
  var nextTrainArr = moment(nextTrainAdd).format("HH:mm");
  console.log("Arrival Time: " + nextTrainArr);

  //prepend all information for train data submitted by user

  $("#trainSchedule").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrainArr + "</td><td>" + nextTrainMin + "</td></tr>");


}, function(err) {
  console.log(err);
});





$(document).ready(function() {
  displayTime();
});
