
AFRAME.registerComponent("check-in", {
  schema: {
    link: {type: "string", default: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
  },
  init: function() {
    this.el.addEventListener("click", () => {
      window.open(this.data.link);
    });
}});

var checkpoints = [
  {
    clue: "Visit Rachael & Vanessa.",
    location: {
      lat: 37.376485,
      lng: -122.032522,
    },
  },
  {
    clue: "Butterfly effect or domino effect? Your choice.",
    location: {
      lat: 37.375227,
      lng: -122.032707
    },
  },
  {
    clue: "Buddy is the best.",
    location: {
      lat: 37.374716, 
      lng: -122.032392,
    },
  },
  {
    clue: "Mmmm...nazaleh!",
    location: {
      lat: 37.376236,  
      lng: -122.030231,
    },
  },
  {
    clue: "Croatian paradise.",
    location: {
      lat: 37.377502,  
      lng: -122.029806,
    },
  },
  {
    clue: "Can you find the path to the center?",
    location: {
      lat: 37.377849,  
      lng: -122.031338,
    },
  },
  {
    clue: "not a ***king",
    location: {
      lat: 37.376612,  
      lng: -122.032817,
    },  
},

];

window.onload = () => {
    buildScene(tokens);
};

var buildCheckpoint = function (checkpoint, assets) {
  let entity = document.createElement("a-cylinder");
  
  let latitude = token.location.lat;
  let longitude = token.location.lng;
  entity.setAttribute("gps-entity-place", `latitude: ${latitude}; longitude: ${longitude};`);  
  entity.setAttribute("radius", "4");
  entity.setAttribute("height", "0.5");
  entity.setAttribute("rotation", "0 0 90");
  entity.setAttribute("shadow", "");
  entity.setAttribute("animation", "property: rotation; dur: 3000; from: 0 0 90; to: 0 360 90; loop: true; easing: linear;");
  entity.setAttribute("check-in", "");
  return entity
};

function buildScene(tokens) {
    let scene = document.querySelector("a-scene");
    
    let assets = document.querySelector("a-assets");
    tokens.forEach((token) => {
        let entity = buildToken(token, assets);
        scene.appendChild(entity);
    });

    scene.appendChild(assets);
}
