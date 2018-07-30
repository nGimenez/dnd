function moveFbRecord(oldRef, newRef) {    
    oldRef.once('value', function(snap)  {
         newRef.set( snap.value(), function(error) {
              if( !error ) {  oldRef.remove(); }
              else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
         });
    });
}


function deleteCollection(db, collectionPath, batchSize) {
    var collectionRef = db.collection(collectionPath);
    var query = collectionRef.orderBy('__name__').limit(batchSize);

    return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
    });
}
  
function deleteQueryBatch(db, query, batchSize, resolve, reject) {
    query.get()
        .then((snapshot) => {
          // When there are no documents left, we are done
          if (snapshot.size == 0) {
            return 0;
          }
  
          // Delete documents in a batch
          var batch = db.batch();
          snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
          });
  
          return batch.commit().then(() => {
            return snapshot.size;
          });
        }).then((numDeleted) => {
          if (numDeleted === 0) {
            resolve();
            return;
          }
  
         deleteQueryBatch(db, query, batchSize, resolve, reject);
          
        })
        .catch(reject);
}

function pushCollection(db, collectionPath, array){
    // Get a new write batch
    var batch = db.batch();

    // ajout des éléments 1 à 1
    array.forEach( element => {
        db.collection(collectionPath).add(element);    
    });
    // Commit the batch
    batch.commit().then(function () {
        console.log("ajout terminé");
    });
}