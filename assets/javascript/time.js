$(document).ready(function () {

    $(".btn").click(function () {
        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var trainTime = $("#train-time").val().trim();
        var frequency = $("#frequency").val().trim();
        var tableRow = $("<tr>");
        tableRow.append("<td>" + trainName + "</td>");
        tableRow.append("<td>" + trainName + "</td>");
        tableRow.append("<td>" + trainName + "</td>");
        tableRow.append("<td>" + trainName + "</td>");
        tableRow.append("<td>" + trainName + "</td>");

        $(".table").append(tableRow);
    })



})