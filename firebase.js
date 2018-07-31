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
}

function pushCollection(db, collectionPath, array){
    // ajout des éléments 1 à 1
    array.forEach( element => {
        db.collection(collectionPath).add(element);    
    });
}

function transactionnalDeleteCollection(db, collectionPath){
    // Create a reference to the SF doc.
    var colRef = db.collection(collectionPath);

    return db.runTransaction(function(transaction) {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(colRef).then(function(docList) {
            docList.docs.forEach( doc => {
                // colRef was a doc
                transaction.delete(doc.id);
            });
        });
    }).then(function() {
        console.log("Transaction successfully committed!");
    }).catch(function(error) {
        console.log("Transaction failed: ", error);
    });
}

function transactionnalPushCollection(db, collectionPath, array){
    // Get a new write batch
    var batch = db.batch();

    array.forEach( element => {
        if (element.id){
            batch.update(element.id, element);
        }else{
            element.id = db.collection(collectionPath).doc();
            batch.set(element.id, element);
        }
    });

    // Commit the batch
    batch.commit().then(function () {
        console.log("Ajout fog effectuée");
    });
    // Create a reference to the SF doc.
}