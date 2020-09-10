AFRAME.registerComponent("rickroll", {
    init: function() {
        this.el.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=iik25wqIuFo");
        });
}});

window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = 'Select The Link';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Paden',
            location: {
                lat: 37.377264,
                lng: -122.033087
            },
            handler: 'rickroll'
        },
    ];
}

function setToken(token, handler) {
    token.setAttribute('radius', `5`);
    token.setAttribute('height', `1`);
    token.setAttribute('rotation', `0 180 90`)
    token.setAttribute('shadow', ``)
    if (handler) {
        token.setAttribute(handler, ``)
    }
}

var index = 0;
function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let token = document.createElement('a-cylinder');
        token.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        setToken(token, place.handler)                
        scene.appendChild(token);
    });
}
