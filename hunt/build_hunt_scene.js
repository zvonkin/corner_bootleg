// Data
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

var mixins = [
  // Geometries
  {
    id: "inner-token", 
    kv: [
      {key: "material", value: "color: #6d24b5;"},
      {key: "geometry", value: "primitive: cylinder; radius: 0.45; height: 0.02;"},
      {key: "rotation", value: "0 0 90"},
   ],
  },
  {
    id: "outter-token", 
    kv: [
      {key: "material", value: "color: #e3ca3d"},
      {key: "geometry", value: "primitive: torus; radius: 0.5; radius-tubular: 0.01;"},
   ],
  },
  // Animation
  {
    id: "spin", 
    kv: [
      {key: "animation", value: "property: rotation; from: 0 0 90; to: 0 360 90; dur: 3000; loop: true; easing:linear;"},
   ],
  },  
];

var createMixin = function (mixin) {
  let a_mixin = document.createElement("a-mixin");
  a_mixin.setAttribute("id", mixin.id);
  mixin.kv.ForEach((kv) => {
    a_mixin.setAttribute(kv.key, kv.value);
  });
  return a_mixin;  
}

var loadMixins = function (mixins) {
  let assets = document.querySelector("a-assets");
  mixins.forEach((mixin) => {
      let asset = createMixin(mixin);
      assests.appendChild(asset);
  });  
}

// Components
AFRAME.registerComponent("check-in", {
  schema: {
    link: {type: "string", default: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
  },
  init: function() {
    this.el.addEventListener("click", () => {
      window.open(this.data.link);
    });
}});

// Functions
var buildToken = function (checkpoint) {
  let entity = document.createElement("a-entity");
  
  let latitude = checkpoint.location.lat;
  let longitude = checkpoint.location.lng;
  entity.setAttribute("gps-entity-place", `latitude: ${latitude}; longitude: ${longitude};`);  
  
  let inner = document.createElement("a-entity");
  inner.SetAttribute("mixin", "inner-token");

  let outer = document.createElement("a-entity");
  inner.SetAttribute("mixin", "outer-token");
  
  entity.appendChild(inner);
  entity.appendChild(outer);

  entity.setAttribute("mixin", "spin");
  entity.setAttribute("check-in", "");
  
  return entity
};

function start(tokens) {
  let scene = document.querySelector("a-scene");
  checkpoints.forEach((checkpoint) => {
      let entity = buildToken(checkpoint);
      scene.appendChild(entity);
  });
}

// Run
window.onload = () => {
    loadMixins();
    buildScene(tokens);
};
