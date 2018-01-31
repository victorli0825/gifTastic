$(document).ready(function() {

    var topics = ["Golden State Warriors", "Houston Rockets", "Oklahoma City Thunder", "Los Angeles Lakers", "San Antonio Spurs", "Boston Celtics", "Toronto Raptors", "Cleveland Cavaliers", "Washington Wizard", "Miami Heat"];

    function displayInfo() {
        var team = $(this).attr("team-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + team + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            $("#teams").empty();

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var teamDiv = $("<div class='nbaTeam'>");

                var rating = results[i].rating;
                var pRate = $("<p>").text("Rating: " + rating);

                var urlStill = results[i].images.fixed_height_still.url;
                var urlPlay = results[i].images.fixed_height.url;

                var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");

                teamDiv.append(gif);
                teamDiv.append(pRate);

                $("#teams").append(teamDiv);
            }

            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } 
                else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

            });
        });

    }

    function renderButtons() {

        $("#teamButtons").empty();

        for (var i = 0; i < topics.length; i++) {

            var sportRender = $("<button>");

            sportRender.addClass("team");
            sportRender.attr("team-name", topics[i]);
            sportRender.text(topics[i]);
            $("#teamButtons").append(sportRender);
        }
    }

    $("#addTeam").on("click", function(event) {
        event.preventDefault();
        var team = $("#team-input").val().trim();

        topics.push(team);
            $("#team-input").val(" ");
        renderButtons();
    });

    $(document).on("click", ".team", displayInfo);

    renderButtons();

});