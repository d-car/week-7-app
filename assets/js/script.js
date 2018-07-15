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

var trainName = "";
var trainDestination = "";
var trainBegin = 0;
var trainFrequency = 0;


function displayTime() {
  var time = moment().format('HH:mm:ss');
  $('#currentTime').html(time);
  setTimeout(displayTime, 1000);
}

// database.ref().on("child_added", function(snapshot) {
  
//     // Get reference to existing tbody element, create a new table row element
//     var tBody = $("tbody");
//     var tRow = $("<tr>");
    

//     // Methods run on jQuery selectors return the selector they we run on
//     // This is why we can create and save a reference to a td in the same statement we update its text
//     var trainNameTd = $("<td>").text(snapshot.val().trainName);
//     var trainDestinationTd = $("<td>").text(snapshot.val().trainDestination);
//     var trainFrequencyTd = $("<td>").text(snapshot.val().trainFrequency);
//     var trainBeginTd = $("<td>").text(snapshot.val().trainBegin);

    
   


//     // Append the newly created table data to the table row
//     tRow.append(trainNameTd, trainDestinationTd, trainFrequencyTd);
//     //  nextTrainTd, minutesAwayTd);

//     // Append the table row to the table body
//     tBody.append(tRow);

// });

// Capture Button Click
$("#submit").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text-boxes
  var trainName = $("#name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainBegin = $("#start-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();
 

  var fixTime = moment(trainBegin, "hh:mm").subtract(1, "years");
  var currentMinute = moment();
 
  //append to html
  $("#currentTime").html(" Current Time : " + currentMinute.format("hh:mm"));

  var timeDifference = moment().diff(moment(fixTime), "minutes");
  var timeRemaining = timeDifference % trainFrequency
  var minutesAway = trainFrequency - timeRemaining;
  var nextTrain = moment().add(minutesAway, "minutes")
  var arrivalTime = moment(nextTrain).format("HH:mm");
  
  console.log(trainName);
  console.log(trainDestination)
  console.log(trainBegin)
  console.log(trainFrequency)
  console.log(nextTrain);
  console.log(arrivalTime);
  console.log(minutesAway);

  // Code for "Setting values in the database"
  database.ref().push({
    trainName: trainName,
    trainDestination: trainDestination,
    trainBegin: trainBegin,
    trainFrequency: trainFrequency,
    arrivalTime: arrivalTime,
    minutesAway: minutesAway,
    date: firebase.database.ServerValue.TIMESTAMP
  });

});

database.ref().on("child_added", function(snapshot) {
  
  // Get reference to existing tbody element, create a new table row element
  var tBody = $("tbody");
  var tRow = $("<tr>");
  

  // Methods run on jQuery selectors return the selector they we run on
  // This is why we can create and save a reference to a td in the same statement we update its text
  var trainNameTd = $("<td>").text(snapshot.val().trainName);
  var trainDestinationTd = $("<td>").text(snapshot.val().trainDestination);
  var trainFrequencyTd = $("<td>").text(snapshot.val().trainFrequency);
  var trainBeginTd = $("<td>").text(snapshot.val().trainBegin);

  
 


  // Append the newly created table data to the table row
  tRow.append(trainNameTd, trainDestinationTd, trainFrequencyTd);
  //  nextTrainTd, minutesAwayTd);

  // Append the table row to the table body
  tBody.append(tRow);

});

$(document).ready(function() {
  displayTime();
});
