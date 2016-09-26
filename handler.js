module.exports = function(req, reply){
  var db = req.db
  
  var events = db.collection('events')
  //TODO: Do advanced validation
  console.log(req.payload)
  if(req.payload.content){
    events.insert(req.payload.content, function(err, resp) {
      return reply().code(200)
    })
  } else {
    reply().code(400)
  }
}
