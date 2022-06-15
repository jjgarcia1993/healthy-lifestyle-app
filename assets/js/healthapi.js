

const access = '5c9ae3d61310402e9ddb0d502d29573d7f612ac2'

fetch('https://wger.de/api/v2/exercise?category=12&language=2')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log('the date', data)
    })


//creates a card with the playlist info and appends it to the spotifyCardContainer
var createPlaylistCard = (exerciseObj) => {
    let cardEl = $("<div>").addClass("column is-one-quarter card m-2");
    let deleteEl = $("<button>").addClass("delete");
    let cardHeaderEl = $("<header>").addClass("card-header")
        .append($("<p>").addClass("card-header-title").text(exerciseObj.name));
    let cardContentEl = $("<div>").addClass("card-content");
    let descriptionEl = $("<p>").addClass("content").text(exerciseObj.description);
    let cardFooterEl = $("<footer>").addClass("card-footer");
    let playlistLinkEl = $("<a>").addClass("card-footer-item").attr("href", 'https://wger.de/en/exercise/'+ exerciseObj.id +'/view/').text("Link");

    cardFooterEl.append(playlistLinkEl);
    cardContentEl.append(descriptionEl);
    cardEl.append(deleteEl, cardHeaderEl, cardContentEl, cardFooterEl);

};
