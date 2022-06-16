//--------------GLOBAL VARIABLES--------------------------

//spotify secret credentials
const client_id = '0cb998c652e247539b3e6bb2e2c5cb93';
const client_secret = 'ee5dae716eb44c48b3d235b1cf35fbab';

//Container Elements
const spotifyCardContainerEl = $("#spotify-card-container");
const workoutContainerEl = $("#workout-card-container")


//----------------FUNCTIONS----------------------

//get spotify access token
var getSpotifyAcessToken = function () {


    //NEED TO ADD ERROR HANDLING FOR THIS TOKEN REQUEST
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            //btoa encodes the string into base64
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials',
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
                    .then((response) => {
                        var token = response.access_token;
                        localStorage.setItem('spotifyTempToken', token);
                        $("#spotify-response").append($("<div>")
                            .addClass("notification is-success")
                            .text("Connected to Spotify")
                            .append($("<button>")
                                .addClass("delete")));
                    });
            } else {
                $("#spotify-response").append($("<div>")
                    .addClass("notification is-warning")
                    .text("Failed to connect to Spotify")
                    .append($("<button>")
                        .addClass("delete")));;
                return false;
            }
        })
};


//creates a card with the playlist info and appends it to the spotifyCardContainer
var createPlaylistCard = (playlistObj) => {
    let cardEl = $("<div>").addClass("column is-one-quarter card m-2");
    let deleteEl = $("<button>").addClass("delete");
    let cardHeaderEl = $("<header>").addClass("card-header")
        .append($("<p>").addClass("card-header-title is-size-4").text(playlistObj.name));
    let cardContentEl = $("<div>").addClass("card-content");
    let descriptionEl = $("<p>").addClass("content").text(playlistObj.description);
    let cardFooterEl = $("<footer>").addClass("card-footer");
    let playlistLinkEl = $("<a>").addClass("card-footer-item is-size-4")
        .attr("href", playlistObj.external_urls.spotify)
        .attr("target","_blank")
        .text("Link");

    cardFooterEl.append(playlistLinkEl);
    cardContentEl.append(descriptionEl);
    cardEl.append(deleteEl, cardHeaderEl, cardContentEl, cardFooterEl);
    spotifyCardContainerEl.append(cardEl);

};





// Exercise card 
var createExerciseCard = (exerciseObj) => {
    let cardEl = $("<div>").addClass("column card m-2");
    let deleteEl = $("<button>").addClass("delete");
    let cardHeaderEl = $("<header>").addClass("card-header")
        .append($("<p>").addClass("card-header-title is-size-4").text(exerciseObj.name));
    let cardContentEl = $("<div>").addClass("card-content");
    let descriptionEl = $("<p>").addClass("content").html(exerciseObj.description);
    let cardFooterEl = $("<footer>").addClass("card-footer");
    let workoutLinkEl = $("<a>").addClass("card-footer-item is-size-4")
    .attr("href", 'https://wger.de/en/exercise/' + exerciseObj.id + '/view/')
    .attr("target","_blank")
    .text("Link");

    cardFooterEl.append(workoutLinkEl);
    cardContentEl.append(descriptionEl);
    cardEl.append(deleteEl, cardHeaderEl, cardContentEl, cardFooterEl);
    workoutContainerEl.append(cardEl);
};

// Search for exercise
var searchExercise = function (searchInput) {
    fetch('https://wger.de/api/v2/exercise?category=' + searchInput + '&language=2')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            let exercises = data.results;
            for (let i = 0; i < 6; i++) {
                createExerciseCard(exercises[i]);
            }
            console.log(data)
        })
};



//search for playlists
var searchPlaylists = function (searchInput) {
    fetch('https://api.spotify.com/v1/search?q=workout%20' + searchInput + '&type=playlist', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('spotifyTempToken'),
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                window.alert("Unable to communicate with Spotify.")
                return false;
            }
        })
        .then((data) => {
            let playlists = data.playlists.items;
            for (let i = 0; i < 6; i++) {
                createPlaylistCard(playlists[i]);
            }
        });
};


var searchHandler = () => {
    spotifyCardContainerEl.empty();
    workoutContainerEl.empty();
    $("#your-playlist-header").empty();
    $("#your-workout-header").empty();

    //get user's name from the input field
    let userName = $("#user-name").val();

    //data validation for user's name
    if(!userName){
        //shows warning notification
        $("#search-warning-container").append($("<div>")
        .addClass("notification is-warning block")
        .text("Please enter your name.")
        .append($("<button>")
            .addClass("delete")));
        return false;
    }

    //gets data attributes from whichever radio button is currently "checked"
    let workoutId = $("input[name='workout-type']:checked").attr("data-id");
    let playlistInput = $("input[name='workout-type']:checked").attr("data-name");

    //data validation for radio buttons
    if (!workoutId || !playlistInput) {
        //shows warning notification
        $("#search-warning-container").append($("<div>")
                            .addClass("notification is-warning block")
                            .text("Please select a workout.")
                            .append($("<button>")
                                .addClass("delete")));
        return false;
    }

    //adds title to playlist section
    $("#your-playlist-header").append(
        $("<h2>").addClass("is-size-2 block").text("Playlists for "+ userName)
    );

     //adds title to workout section
     $("#your-workout-header").append(
        $("<h2>").addClass("is-size-2 block").text("Workouts for "+ userName)
    );

    //runs the wger search
    searchExercise(workoutId);

    //runs the spotify search
    searchPlaylists(playlistInput);
};

var clearAllCards = () => {
   spotifyCardContainerEl.empty();
   workoutContainerEl.empty();
};

//---------------INITIALIZATIONS------------------

//gets the spotify access token and displays a notification if successful
getSpotifyAcessToken();

//allows the user to click the "X" button with a class of .delete to remove the element
$("body").on("click", ".delete", function () {
    $(this).parent().remove();
});

$("#show-results-btn").on("click", searchHandler);
$("#clear-button").on("click", clearAllCards);
