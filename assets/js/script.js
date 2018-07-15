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

//clears input fields
function clearInputs() {
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
}
//runs clock
function displayTime() {
  var time = moment().format('HH:mm:ss');
  $('#currentTime').html(time);
  setTimeout(displayTime, 1000);
}

// Capture Button Click
$("#submit").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text-boxes
  var trainName = $("#name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainBegin = $("#start-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();
  
  clearInputs();

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


  //create new variables from snapshot of firebase data

  var name = childSnapshot.val().trainName;
  var destination = childSnapshot.val().trainDestination;
  var frequency = childSnapshot.val().trainFrequency;
  var time = childSnapshot.val().trainBegin;

  //convert time before pushing to database.
  var fixTime = moment(time, "HH:mm").subtract(1, "years");
  // console.log(fixTime);

  var currentTime = moment();
  // console.log("Current Time: " + moment(currentTime).format("HH:mm"));

  //current time
  $("#currentTime").html(moment(currentTime).format("HH:mm"));

  //finds diff between og train and current time
  var timeDiff = moment() - frequency;
  console.log("Difference In Time: " + timeDiff);

  
  var timeRemainder = timeDiff % frequency;
  console.log(timeRemainder);

  //time until next train for table
  var nextTrainMin = frequency - timeRemainder;
  console.log("Minutes Till Train: " + nextTrainMin);

  //time of next train in HH:mm format for table
  var nextTrainAdd = moment().add(nextTrainMin, "minutes");
  var nextTrainArr = moment(nextTrainAdd).format("HH:mm");
  console.log("Arrival Time: " + nextTrainArr);

  //appends all information for train data submitted by user
  $("#trainSchedule").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrainArr + "</td><td>" + nextTrainMin + "</td></tr>");
});




//display clock on document load
$(document).ready(function() {
  displayTime();
});
