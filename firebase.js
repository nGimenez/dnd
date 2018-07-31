function moveFbRecord(oldRef, newRef) {    
    oldRef.once('value', function(snap)  {
         newRef.set( snap.value(), function(error) {
              if( !error ) {  oldRef.remove(); }
              else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
         });
    });
}


function deleteCollection(db, collectionPath, batchSize, callback) {
    var collectionRef = db.collection(collectionPath);
    var query = collectionRef.orderBy('__name__').limit(batchSize);

    deleteQueryBatch(db, query, batchSize);
    callback();
}
  
function deleteQueryBatch(db, query) {
    query.get()
        .then((docs) => {
            docs.forEach((doc) => {
                console.log("test");
                doc.delete();
            });
        })
        // deleteQueryBatch(db, query, batchSize, resolve, reject);
          
}

function pushCollection(db, collectionPath, array){
    // // Get a new write batch
    // var batch = db.batch();

    // ajout des éléments 1 à 1
    array.forEach( element => {
        db.collection(collectionPath).add(element);    
    });
    // Commit the batch
    // batch.commit().then(function () {
    //     console.log("ajout terminé");
    // });
}