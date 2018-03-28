var database = firebase.database();


$(document).ready(function () {

    function time() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        if (hours < 10) {
            hours = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        $("#current-time").text(hours + ":" + minutes + ":" + seconds);
    }

    time();

    setInterval(time, 1000);

    $(".btn").click(function () {

        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var trainTime = $("#train-time").val().trim();
        var frequency = $("#frequency").val().trim();


        database.ref().push({
            name: trainName,
            destination: destination,
            time: trainTime,
            freq: frequency
        })



        var tableRow = $("<tr>");
        tableRow.append("<td>" + trainName + "</td>");
        tableRow.append("<td>" + destination + "</td>");
        tableRow.append("<td>" + frequency + "</td>");
        tableRow.append("<td>" + trainName + "</td>");
        tableRow.append("<td>" + trainName + "</td>");

        $(".table").append(tableRow);

    })

    database.ref().on("child_added", function(snapshot) {

        var name = snapshot.val().name;
        var dest = snapshot.val().destination;
        var userTime = snapshot.val().time;
        var freq = parseInt(snapshot.val().freq);

        var utConvert = moment(userTime, "HH:mm").subtract(1, "years");
        var now = moment();
        var diffTime = moment().diff(moment(utConvert), "minutes");
        var tRemain = diffTime % freq;
        var tMinus = freq - tRemain;
        var nextTrain = moment().add(tMinus, "minutes").format("HH:mm");
        console.log(nextTrain);


        var tableRow = $("<tr>");
        tableRow.append("<td>" + name + "</td>");
        tableRow.append("<td>" + dest + "</td>");
        tableRow.append("<td>" + freq + "</td>");
        tableRow.append("<td>" + nextTrain + "</td>");
        tableRow.append("<td>" + tMinus + "</td>");

        $(".table").append(tableRow);



    })

})