 // alert("this is working")
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAgF-kW8NPzjWivVlQGNMTgGRhIMcatOAs",
    authDomain: "train-schedule-57d46.firebaseapp.com",
    databaseURL: "https://train-schedule-57d46.firebaseio.com",
    projectId: "train-schedule-57d46",
    storageBucket: "",
    messagingSenderId: "139756895798"
  };
  firebase.initializeApp(config);

  // Initial values
  var database = firebase.database();
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = $("#firstTrain").val().trim();
  var frequency = $("#frequency").val().trim();
//===============================================================
//Dashboard clock//
var Time = setInterval(function(){
  now = moment().format('HH:mm:ss a')
  $("#clock").text(now)
},1000)

setInterval(function(){
  location.reload();
}, 60000)
//===============================================================

$("#submit").on("click", function(event) {
  event.preventDefault();
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = $("#firstTrain").val().trim();
  var frequency = $("#frequency").val().trim();

  database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain,
  })
});

database.ref().on("child_added", function(snapshot){
  var sv = snapshot.val();
  // console.log(sv)
  $("#schedule").append(
    `
  <tr id="newRow">
  <td class="tableDiv">${sv.trainName}</td>
  <td class="tableDiv">${sv.destination}</td>
  <td class="tableDiv">${sv.frequency}</td>
  <td class="tableDiv">${firstTrain}</td>
  <td class="tableDiv">${nextTrain}</td>
  <td class="tableDiv">${tMinutesNextTrain}</td>
  </tr>
  `
);
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

//====================time coversion===============//

var trainFreq = 5;
var firstTrain = "03:30"

var firstConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
// console.log(firstConverted);

var currentTime = moment();

var timeDiff = (currentTime).diff(moment(firstConverted), "minutes")
// console.log(timeDiff)

var timeReminder = timeDiff % trainFreq;
// console.log(timeRe minder);

var tMinutesNextTrain = trainFreq - timeReminder;
// console.log(tMinutesNextTrain);

var nextTrain = moment().add(tMinutesNextTrain, "minutes").format("hh:mm a");
// console.log(nextTrain);
//====================time coversion===============//
