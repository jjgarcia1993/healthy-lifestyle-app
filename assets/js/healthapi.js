const access = '5c9ae3d61310402e9ddb0d502d29573d7f612ac2'

fetch('https://wger.de/api/v2/exercisecategory/')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log('the date', data)
    })