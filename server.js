var http = require ('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
http.createServer(function (request, response) {
    console.log('request starting:'+request.url);
	/*
	var pathname = '.' + request.url;
	if (pathname == './')
		pathname = './index.html';
		
	var extname = path.extname(pathname);
	var contentType = 'text/html';
	*/
	var pathname = "."+url.parse(request.url).pathname;

	var extention = path.extname(pathname);
	console.log(extention);
	var contentType='text/html'
	switch (extention) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.html':
			contentType='text/html';
			break;
		case '':
			contentType='text/html';
			pathname = pathname+'index.html';
			break;
	}

	console.log(pathname);

	fs.exists(pathname, function(exists) {
	
		if (exists) {
			fs.readFile(pathname, function(error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
				}
				else {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
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
			});
		}
	});
	
}).listen(8000);
console.log('Server running one port 8000');
