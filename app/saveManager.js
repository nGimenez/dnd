// this javascript is used to
//  - save the world (not an easy task ;)
//  - load the world (at start)
//  - switch between saves

function saveTheWorld(currentWorld){
    // we have an object world we need to save in a firebase database
    // to make it easier, we split it in 3 éléments :
    // 1 - a list of players/characters
    const listOfPlayers = currentWorld.filter(item => item.type instanceof Player);
    // 2 - a list of monsters/opponents (pretty much the same stuff than player)
    const listOfMonsters = currentWorld.filter(item => item.type instanceof Monster);
    // 3 - a map (dimensions / grid position / url to image and stuff)
    // const map = ;
    
    // then we have to convert the objects to simple json objects
        // without all the functions and heavy stuff they contains
        // with only properties and simple json objects
    // players
    let simpleJsonListOfPlayers = [];
    let simpleJsonPlayer = {};
    listOfPlayers.forEach(player => {
        console.log(player);
    })
    // monsters
    listOfMonsters.forEach(monster => {
        console.log(monster);
    })
    // map

}

function saveMap(db, mapTile){
    var jsonMapTile = {
        name: mapTile.name,
        offsetX: mapTile.pos.x,
        offsetY: mapTile.pos.y,
        widthPx: mapTile.w, // largeur de la map en px
        heightPx: mapTile.h, // hauteur de la map en px
        imgUrl: mapTile.img.url
    }
    console.log("saving map tile ...");
    db.doc('world/00000001/map/1').set(jsonMapTile);
}

function saveGrid(db, grid){
    var jsonGrid = {
        name: grid.name,
        offsetX: grid.pos.x,
        offsetY: grid.pos.y,
        widthPx: grid.mapW, // largeur de la map en px
        heightPx: grid.mapH, // hauteur de la map en px
        cellSize: grid.cellW, // largeur d'une cellule en px
        width: grid.w, // largeur de la grille en cellules
        height: grid.h, // hauteur de la grille en cellules
    }
    console.log("saving map...");
    db.doc('world/00000001/grid/1').set(jsonGrid);
}

function saveFog(db, fog){
    var arrayToDelete = [];
    var promises = []
    // There we listen to realtime changes on fog of war
    db.collection('world/00000001/fog').get().then(snapshot => {
        snapshot.docs.forEach(point => {
            promises.push(db.collection('world/00000001/fog').doc(point.id).delete());
        })
    }).then(new function(){
        Promise.all(promises).then(function(){
            pushCollection(db, 'world/00000001/fog', fog);
        });
    });
}

function saveFogBatch(db, fog){
    var arrayToDelete = [];
    var promises = []
    // There we listen to realtime changes on fog of war
    clearCollectionBatch(db, 'world/00000001/fog', fog);
    pushCollectionBatch(db, 'world/00000001/fog', fog);
}

function removeDoublons(value, index, self){
    return self.findIndex(e => compareValues(e, value)) === index;
}
function compareValues(element, value){
  return value.x === element.x && value.y === element.y;
}


function loadMap(db){
    // firebase alternate document and collection when exploring the tree
    // our save containing already 2 collections (list of players and list of Monsters)
    // we will save our map in a third collection so that it's stay at the same level even though there is only one map
    // let query = db.collection('world/00000001/map').where('name','==',mapName);
 
    // // There we listen to realtime changes 
    // query.onSnapshot(maps => {
    //     console.log("retrieved documents from collection : ");
    //     maps.forEach(map => {
    //         const data = map.data();
    //         console.log(data);
    //     });
    // })


    // There we listen to realtime changes on map
    db.doc('world/00000001/map/1').onSnapshot(map => {
        console.log("---------- MAP updated --------------");
        const data = map.data();
    });

    // There we listen to realtime changes on grid
    db.doc('world/00000001/grid/1').onSnapshot(grid => {
        console.log("------------- GRID updated --------------");
        const data = grid.data();
    });

    // There we listen to realtime changes on fog of war
    db.collection('world/00000001/fog').onSnapshot(points => {
        points.forEach(point => {
            const data = point.data();
        })
    });
    
}

function loadFog(db, fog){
    // There we listen to realtime changes on fog of war
    db.collection('world/00000001/fog').onSnapshot(points => {
        fog.length = 0;
        points.forEach(point => {
            const data = point.data();
            fog.push({id:point.id, x:data.x, y:data.y});
        })
    });
}