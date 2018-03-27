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
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();

        var hourDiff = 0;
        var minuteDiff = 0;

        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var trainTime = $("#train-time").val().trim();
        var frequency = $("#frequency").val().trim();




        function timeDifference() {

            var userTime = trainTime.split(":");
            var userHour = parseInt(userTime[0]);
            var userMinutes = parseInt(userTime[1]);

            if ((userHour - hours) < 0 && (userMinutes - minutes) > 0) {
                hourDiff = (userHour - hours) + 24;
            } else if ((userHour - hours) < 0 && (userMinutes - minutes) < 0) {
                hourDiff = (userHour - hours) + 23;
            } else if ((userHour - hours) > 0 && (userMinutes - minutes) < 0) {
                hourDiff = (userHour - hours) - 1;
            } else if ((userHour - hours) < 0 && userMinutes === minutes) {
                hourDiff = userHour - hours + 24;
            } else {
                hourDiff = userHour - hours;
            }
            if ((userMinutes - minutes) < 0) {
                minuteDiff = (userMinutes - minutes) + 60;
            } else {
                minuteDiff = userMinutes - minutes;
            }

            console.log(hourDiff);
            console.log(minuteDiff);

        }

        timeDifference();




        var tableRow = $("<tr>");
        tableRow.append("<td>" + trainName + "</td>");
        tableRow.append("<td>" + trainName + "</td>");
        tableRow.append("<td>" + trainName + "</td>");
        tableRow.append("<td>" + trainName + "</td>");
        tableRow.append("<td>" + trainName + "</td>");

        $(".table").append(tableRow);


    })

})