AFRAME.registerComponent("rickroll", {
    init: function() {
        this.el.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=iik25wqIuFo");
        });
}});

window.onload = () => {
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

function setRotation(animation) {
    animation.setAttribute('attribute', 'rotation');
    animation.setAttribute('dur', '3000');
    animation.setAttribute('to', '360 0 0');
    animation.setAttribute('repeat', 'indefinite');
    animation.setAttribute('easing', 'linear');    
}

function setToken(token) {
    token.setAttribute('radius', '5');
    token.setAttribute('height', '1');
    token.setAttribute('rotation', '0 180 90');
    token.setAttribute('shadow', '');
    token.setAttribute('rickroll', '');
    token.setAttribute('material', `src: ./assets/paden.jpg`);
    
    let animation = document.createElement('a-animation');
    setRotation(animation);
    token.appendChild(animation);
}

var index = 0;
function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let token = document.createElement('a-cylinder');
        token.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        scene.setAttribute('raycaster', `objects: [rickroll];`);
        setToken(token);
        scene.appendChild(token);
    });
}
