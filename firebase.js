function moveFbRecord(oldRef, newRef) {    
    oldRef.once('value', function(snap)  {
         newRef.set( snap.value(), function(error) {
              if( !error ) {  oldRef.remove(); }
              else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
         });
    });
}