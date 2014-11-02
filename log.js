var https = require ('https');
var fs = require('fs');
var options = { //Stores https server setting like cert and key
	cert: fs.readFileSync('/etc/nginx/ssl/ssl-unified.crt'),
 	key: fs.readFileSync('/etc/nginx/ssl/riptiderobotics-dec.key')
}
var file = './log.txt';
https.createServer(options, function(request,response) {
	fs.exists(file, function(exists) {
		fs.watch(file, function(event,filename) {

		});
	});
}).listen(8000);