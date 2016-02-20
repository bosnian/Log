var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({port: 3000});

server.ext('onRequest', function(request, reply) {
	console.log("Mujo")
	
	setTimeout(function(){
		return reply.continue()
	},1000)
	
});
server.route({
    method: 'GET',
    path: '/{yourname*}',
    handler: function(req, reply) {
			reply( "Radi")
    }
});

server.start(function(){ // boots your server
    console.log('Now Visit: http://localhost:3000/YOURNAME')
});

module.exports = server;
