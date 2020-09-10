window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'RickRoll',
            location: {
                lat: 37.377264,
                lng: -122.033087
            },
        },
    ];
}

var videoLinks = [
    {
        href: 'https://www.youtube.com/watch?v=iik25wqIuFo',
        text: 'Get Rickrolled',
    },
    {
        href: 'https://www.youtube.com/watch?v=j5C6X9vOEkU',
        text: 'Banana-Phone!
    },
];

var index = 0;

var setVideoLink = function (video_link, alink) {
    if (model.text) {
        alink.setAttribute('title', video_link.text);
    }
    alink.setAttribute('href', video_link.href);
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let videoLink = document.createElement('a-link');
        videoLink.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setVideoLink(videoLinks[index], videoLink);

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var videoLink = document.querySelector('[gps-entity-place]');
            index++;
            var newIndex = index % videoLinks.length;
            setVideoLink(videoLinks[index], videoLink);
        });

        scene.appendChild(videoLink);
    });
}
