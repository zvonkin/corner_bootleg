window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Rick Roll',
            location: {
                lat: 37.377264,
                lng: -122.033087
            },
        },
    ];
}

var models = [
    {
        info: 'Magnemite, Lv. 5, HP 10/10',
    },
    {
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];

var modelIndex = 0;
var setModel = function (model) {
    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let link = document.querySelector('a-link');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}
