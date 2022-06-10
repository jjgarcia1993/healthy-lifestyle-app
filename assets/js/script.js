//spotify secret credentials
var client_id = '';
var client_secret = '';

//get auth button for testing
var getAuthButton = $("#get-auth-token-btn");

//get spotify access token
var getSpotifyAcessToken = function () {
    //object that contains the info to make the request
 
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






    


//     request.post(authOptions, function (error, response, body) {
//         //if there is no error and status code is 200, return an access token
//         if (!error && response.statusCode === 200) {
//             var token = body.access_token;
//         }
//         console.log(token);
//     });
// };


getAuthButton.on("click", getSpotifyAcessToken);