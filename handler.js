var db = null

function checkIfKeyIsValid(key, callback) {
   var environments = db.collection('environments')
   
   environments.findOne({key: key}, function(err, doc){
     if(err != null || doc == null){
       callback(false)
     } else {
       callback(true)
     }
   })
}

module.exports = function(req, reply){
  db = req.db
  
  var events = db.collection('events')
  
  //TODO: Do advanced validation
  console.log(req.payload)
  if(req.payload.content){
    req.payload.content.key = req.payload.key
    req.payload.content.datetime = new Date()
    checkIfKeyIsValid(req.payload.key, function(valid){
      if(valid){
        events.insert(req.payload.content, function(err, resp) {
          return reply().code(200)
        })
      } else {
        reply().code(400)
      }
    })
  } else {
    reply().code(400)
  }
}
