// Initialize Firebase
var config = {
  apiKey: "AIzaSyDcg7G7FCEwK1DLhuQYYC0Ge9-N5dqfGmY",
  authDomain: "week-7-train-b61c9.firebaseapp.com",
  databaseURL: "https://week-7-train-b61c9.firebaseio.com",
  projectId: "week-7-train-b61c9",
  storageBucket: "week-7-train-b61c9.appspot.com",
  messagingSenderId: "569981737817"
};

var trainName = "";
var trainDestination = "";
var trainBegin = 0;
var trainFrequency = 0;

firebase.initializeApp(config);
var database = firebase.database();


database.ref().on("child_added", function(snapshot) {
  // console.log(snapshot.val().name);



  
    // Get reference to existing tbody element, create a new table row element
    var tBody = $("tbody");
    var tRow = $("<tr>");
    

    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text
    var trainNameTd = $("<td>").text(snapshot.val().trainName);
    var trainDestinationTd = $("<td>").text(snapshot.val().trainDestinaton);
    var trainBeginTd = $("<td>").text(snapshot.val().trainBegin);
    var trainFrequencyTd = $("<td>").text(snapshot.val().trainFrequency);
   


    // Append the newly created table data to the table row
    tRow.append(trainNameTd, trainDestinationTd, trainBeginTd, trainFrequencyTd);
      // , workedTd, billedTd);
    // Append the table row to the table body
    tBody.append(tRow);
  

});

// Capture Button Click
$("#submit").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text-boxes
  trainName = $("#name-input").val().trim();
  trainDestination = $("#destination-input").val().trim();
  trainBegin = $("#start-input").val().trim();
  trainFrequency = $("#frequency-input").val().trim();
  // nextArrival = $("#worked").val().trim();
  // minutesAway = $("#billed").val().trim();

  // Code for "Setting values in the database"
  database.ref().push({
    trainName: trainName,
    trainDestination: trainDestination,
    trainBegin: trainBegin,
    trainFrequency: trainFrequency,
    // nextArrival: nextArrival,
    // minutesAway: minutesAway,
    date: firebase.database.ServerValue.TIMESTAMP
  });
console.log(trainName);
console.log(trainDestination)
console.log(trainBegin)
console.log(trainFrequency)



});

$(document).ready(function() {
  console.log("hello")
})
