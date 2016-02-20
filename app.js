var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({port: 5000});

server.ext('onRequest', function(request, reply) {
	console.log("Mujo")
	
	setTimeout(function(){
		return reply.continue()
	},1000)
	
});
var t = 0
server.route({
    method: 'GET',
    path: '/{yourname*}',
    handler: function(req, reply) {
			t++;
        reply( "\n" + process.pid + ' !' + t + "\n")
    }
});

server.start(function(){ // boots your server
    console.log('Now Visit: http://localhost:3000/YOURNAME')
});

module.exports = server;
