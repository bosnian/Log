var Hapi = require('hapi')
var mongodb = require('mongodb')
var corsHeaders = require('hapi-cors-headers')
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

server.ext('onPreResponse', corsHeaders)
server.ext('onPreHandler', function(request, reply) {
  // console.log(request.payload);
	if(request.payload != null && request.payload.key != null){
		request.db = db
		return reply.continue()
	} else {
		return reply().code(404)
	}	
})

server.route({
    method: 'POST',
    path: '/',
    handler: handler
})

server.route({
  method: 'GET',
  path: '/',
  handler: function(req,reply){
     return reply().code(200);
  }
})

server.start(function(){
    console.log('Now Visit: http://localhost:3000/')
})

module.exports = server
