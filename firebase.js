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

function clearCollectionBatch(db, collectionPath, fog){
    
    console.log(fog);
    var collection = db.collection(collectionPath);
    // Create a reference to the SF doc.
    var colRef = collection.get().then((snapshot) => {
        var batch = db.batch();
        snapshot.docs.forEach((docRef) => {
            doc = docRef.data();
            // console.log(doc);
            // console.log(docRef);
            // console.log("point " + doc.x + "," + doc.y );
            // si l'élément présent en base n'existe plus on le supprime
            if (fog.findIndex((e) => compareValues(e, doc)) < 0){
                
                console.log("point " + doc.x + "," + doc.y + " in database only : deleting...");
                batch.delete(collection.doc(doc.id));
            }
        });
        return batch.commit().then(function () {
            console.log("Suppression fog effectuée");
        })
    });
}

function compareValues(element, doc){
    console.log(element);
    return doc.x === element.x && doc.y === element.y;
  }
function compareId(eid, docid){
    console.log(eid + " vs " + docid);
    return eid === docid;
}

function pushCollectionBatch(db, collectionPath, array){
    // Get a new write batch
    var batch = db.batch();
    let collection = db.collection(collectionPath);
    let ref;
    array.forEach( element => {
        if (element.id){
            batch.update(collection.doc(element.id), element);
        }else{
            ref = collection.doc();
            element.id = ref.id;
            batch.set(ref, element);
        }
    });

    // Commit the batch
    batch.commit().then(function () {
        console.log("Ajout fog effectuée");
    });
    // Create a reference to the SF doc.
}