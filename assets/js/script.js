//spotify secret credentials
var client_id = 'CLIENT_ID';
var client_secret = 'CLIENT_SECRET';

//get spotify access token
var getSpotifyAcessToken = function () {
    //object that contains the info to make the request
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        //if there is no error and status code is 200, return an access token
        if (!error && response.statusCode === 200) {
            var token = body.access_token;
        }
        console.log(token);
    });
};
