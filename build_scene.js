AFRAME.registerComponent("click", {
  schema: {
    link: {type: "string", default: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
  },
  init: function() {
    this.el.addEventListener("click", () => {
      window.open(this.data.link);
    });
}});

AFRAME.registerComponent("drag-rotate", {
    schema : { speed : {default:1}},
    init : function() {
        this.ifMouseDown = false;
        this.x_cord = 0;
        this.y_cord = 0;
        document.addEventListener('mousedown',this.OnDocumentMouseDown.bind(this));
        document.addEventListener('mouseup',this.OnDocumentMouseUp.bind(this));
        document.addEventListener('mousemove',this.OnDocumentMouseMove.bind(this));
    },
    OnDocumentMouseDown : function(event){
        this.ifMouseDown = true;
        this.x_cord = event.clientX;
        this.y_cord = event.clientY;
    },
    OnDocumentMouseUp : function(){
        this.ifMouseDown = false;
    },
    OnDocumentMouseMove : function(event) {
        if(this.ifMouseDown) {
            var temp_x = event.clientX-this.x_cord;
            var temp_y = event.clientY-this.y_cord;
            if(Math.abs(temp_y)<Math.abs(temp_x)) {
                this.el.object3D.rotateY(temp_x*this.data.speed/1000);
            } else {
                this.el.object3D.rotateX(temp_y*this.data.speed/1000);
            }
        this.x_cord = event.clientX;
        this.y_cord = event.clientY;
        }
    }
});


export var tokens = [
  {
    name: "Paden",
    imageTop: "./assets/paden.jpg",
    imageBottom: "./assets/paden-down.jpg",
    imageSide: "./assets/gold.jpeg",
    location: {
      lat: 37.377053,
      lng: -122.032437,
    },
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    name: "Misha",
    imageTop: "./assets/misha.jpg",
    imageBottom: "./assets/misha-down.jpg",
    imageSide: "./assets/green.jpg",
    location: {
      lat: 37.376723,
      lng: -122.033664,
    },
    link: "https://www.youtube.com/watch?v=2-8gsWZqDBM",
  }, 
];

window.onload = () => {
    buildScene(tokens);
};

var getAssetId = function (src) {
  return src.split("/")[2].split(".")[0];
}

var loadTokenAsset = function (id, src, assets) {
  let asset = document.createElement("img");
  asset.setAttribute("id", id);
  asset.setAttribute("src", src);
  assets.appendChild(asset);
}

var setTextures = function (token, assets) {
  let textureSources = ""
  if (token.imageSide) {
    let asset_id = getAssetId(token.imageSide);
    textureSources = textureSources.concat(`src0: #${asset_id};`);
    loadTokenAsset(asset_id, token.imageSide, assets);
  }
  if (token.imageTop) {
    let asset_id = getAssetId(token.imageTop);
    textureSources = textureSources.concat(`src1: #${asset_id};`);
    loadTokenAsset(asset_id, token.imageTop, assets);
  }
  if (token.imageBottom) {
    let asset_id = getAssetId(token.imageBottom);
    textureSources = textureSources.concat(`src2: #${asset_id};`);
    loadTokenAsset(asset_id, token.imageBottom, assets);
  } 
  return textureSources;
}

var buildToken = function (token, assets) {
  let entity = document.createElement("a-cylinder");
  
  let latitude = token.location.lat;
  let longitude = token.location.lng;
  entity.setAttribute("gps-entity-place", `latitude: ${latitude}; longitude: ${longitude};`);  
  entity.setAttribute("radius", "4");
  entity.setAttribute("height", "0.5");
  entity.setAttribute("rotation", "0 0 90");
  entity.setAttribute("shadow", "");
  entity.setAttribute("animation", "property: rotation; dur: 3000; from: 0 0 90; to: 0 360 90; loop: true; easing: linear;");
  entity.setAttribute("drag-rotate", "");
    
  if (token.link) {
    entity.setAttribute("clickable", `link: ${token.link};`);
  }
  
  let textureSources = setTextures(token, assets);
  if (textureSources) {
    entity.setAttribute("multisrc", textureSources);
  }

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
