import * as componets from "./components.js";
import {tokens} from ".tokens.js";

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
