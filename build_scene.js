window.onload = () => {
    buildScene(tokens);
};

AFRAME.registerComponent("clickable", {
  schema: {
    link: {type: 'string', default: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
  },
  init: function() {
    this.el.addEventListener("click", () => {
      window.open(this.data.link);
    });
}});

var tokens = [
  {
    name: 'Paden',
    imageTop: './assets/paden.jpg'
    imageBottom: './assets/paden-down.jpg'
    imageSide: './assets/gold.jpg'
    location: {
      lat: 37.377053, ,
      lng: -122.032437,
    },
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    name: 'Misha',
    imageTop: './assets/misha.jpg'
    imageBottom: './assets/misha-down.jpg'
    imageSide: './assets/green.jpg'
    location: {
      lat: 37.376723,
      lng: -122.033664,
    },
    link: 'https://www.youtube.com/watch?v=2-8gsWZqDBM'
  }, 
];

var getAssetId = function (src) {
  return src.split("/")[2].split(".")[0];
}

var loadTokenAsset = function (id, src, assets) {
  let asset = document.createElement('img');
  asset.setAttribute('id', id);
  asset.setAttribute('src', src);
  assets.appendChild(asset);
}

var setTextures = function (token, assets) {
  let textureSources = ""
  if (token.imageSide) {
    let asset_id = getAssetId(token.imageSide);
    textureSources.concat(`src0: #${asset_id};`);
    loadTokenAsset(asset_id, token.imageSide, assets);
  }
  if (token.imageTop) {
    let asset_id = getAssetId(token.imageTop);
    textureSources.concat(`src1: #${asset_id};`);
    loadTokenAsset(asset_id, token.imageTop, assets);
  }
  if (token.imageBottom) {
    let asset_id = getAssetId(token.imageBottom);
    textureSources.concat(`src2: #${asset_id};`);
    loadTokenAsset(asset_id, token.imageBottom, assets);
  } 
  return textureSources;
}

var buildToken = function (token, assets) {
  let entity = document.createElement('a-cylinder');
  
  let latitude = token.location.lat;
  let longitude = token.location.lng;
  entity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);  
  entity.SetAttibute("radius", "4");
  entity.SetAttibute("height", "0.5");
  entity.SetAttibute("rotation", "0 0 90");
  entity.SetAttibute("shadow", "");
  entity.SetAttibute("animation", "property: rotation; dur: 2000; from: 0 0 90; to: 0 360 90; loop: true; easing: linear;");
 
  if (token.link) {
    entity.setAttribute('clickable', token.link);
  }
  
  let textureSources = setTextures(token, assets);
  if (textureSources) {
    entity.setAttribute('multisrc', textureSources);
  }

  return entity
};

function buildScene(tokens) {
    let scene = document.querySelector('a-scene');
    
    let assets = document.querySelector('a-assets')
    tokens.forEach((token) => {
        let entity = buildToken(token);
        loadTokenAssets(token, assets)
        scene.appendChild(entity);
    });
    scene.appendChild(assets);
}