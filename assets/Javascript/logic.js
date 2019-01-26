

var config = {
    apiKey: "AIzaSyBK9_suSqr8YFdd3odPmCajDjnJJYcLicU",
    authDomain: "trainscheduler-6565b.firebaseapp.com",
    databaseURL: "https://trainscheduler-6565b.firebaseio.com",
    storageBucket: "trainscheduler-6565b.appspot.com"
};

firebase.initializeApp(config);
var database = firebase.database();

var trainCounter = 0;

$("#click-button").on("click", function (event) {
    event.preventDefault();

    var Tname = $("#name").val().trim();
    var Tdest = $("#dest").val().trim();
    var Ttime = moment($("#time").val().trim(), "HH:mm").format("X");
    var Tfreq = $("#freq").val().trim();
    Tfreq = parseInt(Tfreq);

    var newTrain = {
        name: Tname,
        dest: Tdest,
        time: Ttime,
        freq: Tfreq
    };
    database.ref().push(newTrain);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.time);
    console.log(newTrain.freq);

    $("#name").val("");
    $("#dest").val("");
    $("#time").val("");
    $("#freq").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trName = childSnapshot.val().name;
    var trDest = childSnapshot.val().dest;
    var trTime = childSnapshot.val().time;
    var trFreq = childSnapshot.val().freq;

    console.log(trName);
    console.log(trDest);
    console.log(trTime);
    console.log(trFreq);

    var firstTimeConverted = moment(trTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % trFreq;
    console.log(tRemainder);

    var tMinutesTillTrain = trFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var newRow = $("<tr>").append(
        $("<td>").text(trName),
        $("<td>").text(trDest),
        $("<td>").text(trFreq),
        $("<td>").text(moment(nextTrain).format("hh:mm")),
        $("<td>").text(tMinutesTillTrain)
    );
    $("#train-table > tbody").append(newRow);
});




