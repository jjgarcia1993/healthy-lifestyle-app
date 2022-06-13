//--------------GLOBAL VARIABLES--------------------------

//spotify secret credentials
const client_id = '0cb998c652e247539b3e6bb2e2c5cb93';
const client_secret = 'ee5dae716eb44c48b3d235b1cf35fbab';

//get auth button for testing
var getAuthButton = $("#get-auth-token-btn");

//test api call button for testing
var testApiButton = $("#test-api-call");


//----------------FUNCTIONS----------------------

//get spotify access token
var getSpotifyAcessToken = function () {
    
    
    //NEED TO ADD ERROR HANDLING FOR THIS TOKEN REQUEST
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            //btoa encodes the string into base64
            'Authorization': 'Basic ' + btoa(client_id+':'+client_secret),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials',
    })
    .then((response) => {
        if (response.ok){
            return response.json()
            .then((response)=>{
                var token = response.access_token;
                localStorage.setItem('spotifyTempToken',token);
                $("#spotify-response").append($("<div>")
                    .addClass("notification is-success")
                    .text("Connected to Spotify")
                    .append($("<button>")
                        .addClass("delete")));
            });
        }else{
           $("#spotify-response").append($("<div>")
                    .addClass("notification is-warning")
                    .text("Failed to connect to Spotify")
                    .append($("<button>")
                        .addClass("delete")));;
            return false;
        }
    })  
};

//test API call
var testApiCall = function(){
    fetch('https://api.spotify.com/v1/search?q=workout&type=playlist',{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('spotifyTempToken'),
            'Content-Type':'application/json'
        }
    })
    .then((response) => {
        if (response.ok){
            return response.json();
        }else{
            window.alert("Unable to communicate with Spotify.")
            return false;
        }  
    })
    .then((response) => {
        console.log(response);
    });
};


//---------------INITIALIZATIONS------------------

//gets the spotify access token and displays a notification if successful
getSpotifyAcessToken();

//allows the user to click the "X" button with a class of .delete to remove the element
$("body").on("click", ".delete", function(){
    $(this).parent().remove();
});