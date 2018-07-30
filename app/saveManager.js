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
        // with first level properties only
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
