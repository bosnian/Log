module.exports = function(req, reply){
  var db = req.db
  
  var payload = req.payload
  
  var events = db.collection('events')
  //TODO: Do advanced validation
  if(payload.content){
    events.insert(payload.content, function(err, resp) {
      return reply().code(200)
    })
  } else {
    reply().code(400)
  }
}
