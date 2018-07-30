var dragonImg;
var mapImg;

var grid;
var mapTile;
var dragon;
var randomMonster;

var isDragging = false;
var isCopying = false;
var world = [];
var palette = [];
var movables = [];

let dimCell;
let worldDatabase;

function preload() {
  // Chargement des images utilisées pour les tiles
  dragonImg = loadImage('assets/monsters/dragon.png');
  mapImg = loadImage('assets/maps/manoir.jpg');
  
}

function setup(){
    initFireBase();
    initPanel();
    dimCell = createVector(50, 50);
    createCanvas(mapImg.width, mapImg.height);
    grid = new Grid("grid", mapImg.width, mapImg.height, dimCell.x, dimCell.y, color('green'));
    mapTile = new Tile("map",0, 0, mapImg.width, mapImg.height, 1, 1, color('green'), mapImg);
    dragon = new Unit("dragon", 20, 15, "dragon", 200, 200, dimCell, 2, 2, color('magenta'), dragonImg);
    randomMonster = new Movable("randomMonster", 50, 50, dimCell, 1, 1, color('magenta'));
    palette.push(new Duplicable("monsterPalette", 500, 50, dimCell, 1, 1, color('red')));
    world.push(mapTile);
    world.push(grid);
    world.push(dragon);
    world.push(randomMonster);
    
    movables = world.filter(t => t instanceof Movable);
}

var mouseHistory = [];

function draw(){
    clear();
    world.forEach(t => t.draw());
    palette.forEach(t => t.draw());
    manageKeyboardEvent();
}


function mousePressed() {
  worldDatabase.doc('00000001').update({"testChamp":"testNouvelleValeur"} );
  let m = createVector(mouseX, mouseY);
  

  palette.forEach((r) => {
    if(r.hits(m)) {
      clickOffset = p5.Vector.sub(r.tile.pos, m);
      isDragging = true;
      console.log("copying : " + r.tile.name);
      spawner = r;
      isCopying = true;
    }
  });

  if (isCopying){
    spawner.cpt++;
    copy = spawner.spawn();
    world.push(copy);
    movingTile = copy;
    isCopying = false;
  }else{
    movables.forEach((r) => {
      if(r.hits(m)) {
        clickOffset = p5.Vector.sub(r.pos, m);
        isDragging = true;
        movingTile = r;
        console.log("dragging : " + r.name);
      }
    });
  }
  
  if(isDragging) {
    pushOnTop(movingTile)
  }
}

function pushOnTop(movingTile) {
  // on met l'élement dragged à la fin du world pour qu'il soit drawn en dernier
  world = world.filter(t => t.name !== movingTile.name);
  world.push(movingTile);
  movables = world.filter(t => t instanceof Movable);
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
    console.log("world : ");
    console.log("----------------");
    world.forEach(t => console.log(t.name))
    console.log("----------------");
  }else if(keyCode === 97){ // 1 pavé numérique
    grid.visible = !grid.visible;
  }
}

function moveGrid(vect){
  // redimensionnement des objets de la grille
  world.filter(t => t.name !== "map")
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

  const db = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  db.settings(settings);
  
  worldDatabase = db.collection('world')
  // Reference the document
  myWorld = worldDatabase.doc('00000001');
  
  // Listen to realtime changes 
  myWorld.onSnapshot(doc => {
  
    const data = doc.data();
    console.log(data);
  
  })

  


  // console.log(firebase);
  // let database = firebase.database();
  // console.log(database);
  // var ref = database.ref('save');
  // var save = {
  //   map: "assets/maps/manoir.jpg"
  // }
  // ref.push(save);
}




  