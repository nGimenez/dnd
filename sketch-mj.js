// Similaire player mais avec des fonctionalités spécifiques
// - Edition du brouillard de guerre
// - Sauvegarde du brouillard de guerre


// - Changement du statut du monstre 
//    - peut être fait par les joueurs
//    - Si par le mj via gestion des PVs directement


var mapImg;

var grid;
var mapTile;

var isDragging = false;
var world = [];

let dimCell;
let worldDatabase;

let database;
let fog = [];

// Dans preload on balance tous les chargements asynchrones pour pouvoir les accéder dans la méthode setup
function preload() {
  const mapUrl = 'assets/maps/manoir.jpg';
  mapImg = loadImage(mapUrl);
  mapImg.url = mapUrl;
  initFireBase();
}

function setup(){
    // loadMap(database, "manoir");
    dimCell = createVector(50, 50);
    createCanvas(mapImg.width, mapImg.height);
    grid = new Grid("manoir grid", mapImg.width, mapImg.height, dimCell.x, dimCell.y, color('green'));
    mapTile = new Tile("manoir map",0, 0, mapImg.width, mapImg.height, 1, 1, color('green'), mapImg);
    world.push(mapTile);
    world.push(grid);
    loadMap(database);
}

var mouseHistory = [];

function draw(){
    clear();
    world.forEach(t => t.draw());
    drawFog(fog, grid, mapTile);
    manageKeyboardEvent();
}


function mousePressed() {
  //saveFog(database, fog);
  // moveFbRecord(worldDatabase.doc('00000001').collection('textCollection'), worldDatabase.doc('00000001').collection('newCollection'));
  const mousePos = createVector(mouseX, mouseY);
  const cellClickedPos = grid.pxToGrid(mousePos)
  // convert mouse to cell position
  console.log(cellClickedPos);
  fog.push({x: cellClickedPos.x, y: cellClickedPos.y});
  fog = fog.filter(removeDoublons);
  
}


function mouseDragged() {
  if(isDragging) {
    let m = createVector(mouseX, mouseY);
    movingTile.move(m.add(clickOffset));
  } 
}

function mouseReleased() {
  if (isDragging){
    //movingTile.pos.set(grid.pxToSnappedPos(movingTile.pos));
    //grid.snapToMap(movingTile);
    movingTile.snapToGrid(grid);
  }
  isDragging = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
  console.log(keyCode);
  // 0 sur pavé numérique affiche le world
  if (keyCode === 96){
    console.log(fog);
    console.log("filtered");
    console.log(fog.filter(removeDoublons));
  }else if(keyCode === 97){ // 1 pavé numérique
    grid.visible = !grid.visible;
  }else if(keyCode === 98){ // 2 pavé numérique
    saveFogBatch(database, fog);
  }else if(keyCode === 99){ // 3 pavé numérique
    saveGrid(database, grid);
  }else if(keyCode === 100){ // 4 pavé numérique
    saveMap(database, mapTile);
  }else if(keyCode === 101){ // 5 pavé numérique
    drawFog(fog, grid, mapTile);
  }
}

function moveGrid(vect){
  // redimensionnement des objets de la grille
  world.filter(t => t.name !== "manoir map")
         .forEach(t => t.pos.add(vect));
  // redimensionnement de la palette
}

function resizeGrid(vect){
  dimCell.add(vect);
  // redimensionnement des objets de la grille
  grid.resize(dimCell, world.filter(t => t instanceof GridItem));
}

function manageKeyboardEvent(){
  // gestion vitesse avec shit
  if (keyIsDown(109)) {// "-"
    resizeGrid(createVector(-0.1, -0.1));
  }else if (keyIsDown(107)){ // "+"
    resizeGrid(createVector(0.1, 0.1));
  }if (keyIsDown(LEFT_ARROW)) {
    moveGrid(createVector(-1, 0));
  } else if (keyIsDown(RIGHT_ARROW)) {
    moveGrid(createVector(1, 0));
  } else if (keyIsDown(DOWN_ARROW)){
    moveGrid(createVector(0, 1));
  }else if (keyIsDown(UP_ARROW)){
    moveGrid(createVector(0, -1));
  }
}

function initFireBase(){
  // Initialize Firebase
  var config = {
    apiKey: "AAAAtCWaZ1A:APA91bGYbkl-W0o8RwZ6Mk0Dq_ChetOoeXO8UGaJEUIaDUfxYIIdNJQzQ0br7NWWf9XvnqnybrTXXdjSxIUOtBsILGlyeNioUUlGWLdmsyJp_pOi-aoxVPLcP2WjSeSBhbSsivKEt8S4iy5QVs6yj-jhHdymNiSt2A",
    authDomain: "dnd-board-saves.firebaseapp.com",
    databaseURL: "https://dnd-board-saves.firebaseio.com",
    projectId: "dnd-board-saves",
    storageBucket: "dnd-board-saves.appspot.com",
    messagingSenderId: "773724989264"
  };
  firebase.initializeApp(config);

  database = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  database.settings(settings);
}




  