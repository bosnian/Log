var Hapi = require('hapi')
var mongodb = require('mongodb')
var handler = require('./handler')

var server = new Hapi.Server()
var MongoClient = mongodb.MongoClient
var url = 'mongodb://analytics:abc123@ds046549.mlab.com:46549/analytics'

var db = false

MongoClient.connect(url, { db: { autoReconnect: true } }, function (err, database) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
		process.exit(1);
  } else {
    console.log('Connection established to mongoDB', url);
		db = database
  }
})

server.connection({port: 3000})

server.ext('onPreHandler', function(request, reply) {
	
	if(request.payload != null && request.payload.key == "06c4aed327920fd83a81e624b37fb9e3"){
		request.db = db
		return reply.continue()
	} else {
		return reply().code(401)
	}	
})

server.route({
    method: 'POST',
    path: '/',
    handler: handler
})

server.start(function(){
    console.log('Now Visit: http://localhost:3000/')
})

module.exports = server
