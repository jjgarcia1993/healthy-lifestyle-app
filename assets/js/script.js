//--------------GLOBAL VARIABLES--------------------------

//spotify secret credentials
const client_id = '';
const client_secret = '';

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
    .then((response) => {return response.json()})
    .then((response)=>{
        var token = response.access_token;
        localStorage.setItem('spotifyTempToken',token);
        $("#spotify-response").text("Authorized");
    });
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
    .then((response) => {return response.json()})
    .then((response) => {
        console.log(response);
    });
};


//---------------INITIALIZATIONS------------------


getAuthButton.on("click", getSpotifyAcessToken);
testApiButton.on("click", testApiCall);