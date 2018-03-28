var database = firebase.database();

// Clock function
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
    // Refresh time every second
    setInterval(time, 1000);

    $(".btn").click(function () {

        // Get user input
        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var trainTime = $("#train-time").val().trim();
        var frequency = $("#frequency").val().trim();

        // store as new child on firebase
        database.ref("/train").push({
            name: trainName,
            destination: destination,
            time: trainTime,
            freq: frequency
        })

    })

    function getFireBaseData() {
        $("table").empty();
        $("table").append("<tr><th>Name</th><th>Destination</th><th>Frequency (min)</th><th>Next Arrival</th><th>Minutes Away</th></tr>");

        database.ref("/train").on("child_added", function (snapshot) {

            // Get values from firebase and store in variables
            var name = snapshot.val().name;
            var dest = snapshot.val().destination;
            var userTime = snapshot.val().time;
            var freq = parseInt(snapshot.val().freq);

            // Convert user time and frequency

            // take use time and subtract one year to make sure it is before todays time
            var utConvert = moment(userTime, "HH:mm").subtract(1, "years");
            // Compare difference between now and user time in MINUTES
            var diffTime = moment().diff(moment(utConvert), "minutes");
            // Get the modulus from the difference and train frequency
            var tRemain = diffTime % freq;
            // Minutes difference between full frequency and left over from difference time modulus
            var tMinus = freq - tRemain;
            // Add the left over time to now and display in HH:mm
            var nextTrain = moment().add(tMinus, "minutes").format("HH:mm");

            // Print info to html
            var tableRow = $("<tr>");
            tableRow.append("<td>" + name + "</td>");
            tableRow.append("<td>" + dest + "</td>");
            tableRow.append("<td>" + freq + "</td>");
            tableRow.append("<td>" + nextTrain + "</td>");
            tableRow.append("<td>" + tMinus + "</td>");

            $(".table").append(tableRow);
        })

    }

    getFireBaseData();

    setInterval(getFireBaseData, 1000);


})