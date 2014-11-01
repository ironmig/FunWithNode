var https = require ('https');
var fs = require('fs');
var path = require('path');
var url = require('url');
var http = require ('http');
var options = { //Stores https server setting like cert and key
	cert: fs.readFileSync('/etc/nginx/ssl/ssl-unified.crt'),
 	key: fs.readFileSync('/etc/nginx/ssl/riptiderobotics-dec.key')
}

var rootDir="/var/www/testwords"; //Directory of web content, all requests are appended to this path
https.createServer(options, function(request,response) {
    console.log('request starting at: '+request.url);

	var pathname = rootDir+url.parse(request.url).pathname;

	var extention = path.extname(pathname);
	console.log('extention: '+(extention || 'no extention'));
	var contentType='text/html';

	switch (extention) { //Selects HTTP content-type bassed on file extension
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.html':
			contentType='text/html';
			break;
		case '.png':
			contentType='image/png';
			break;
		case '.txt': //Text files are text/plain
			contentType='text/plain';
			break;
		case '': //If there is no extension, add index.html to desired file path
			contentType='text/html';
			pathname = url.resolve(pathname+'/','index.html');
			break;
	}
	console.log(pathname);
	fs.exists(pathname, function(exists) {
	
		if (exists) {
			fs.readFile(pathname, function(error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
					console.log("500\n");

				}
				else {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
					console.log("200\n");
				}
			});
		}
		else { //File not found, 404
			fs.readFile('./404.html', function(error,content) { //tries to read 404 error
				if (error) { //default 404 message
					response.writeHead(404,{'Content-Type':'text/html'});
					response.end("<h1 style='text-align:middle'>404 Error</h1>",'utf-8');
				} else {
					response.writeHead(404,{'Content-Type':'text/html'});
					response.end(content, 'utf-8');
				}
				console.log("404\n");
			});
		}
	});		
}).listen(8000);
console.log("HTTPS Server created on port 8000\n");
