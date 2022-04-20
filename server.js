const http = require('http');

http.createServer((request, response) => {
    response.writeHead(200, { 'Content-type': 'application/json' });
    if (request.url === '/product') {
        response.end(
            JSON.stringify({
                message: 'Product route',
            })
        );
    }
    if (request.url === '/user') {
        response.end(
            JSON.stringify({
                message: 'User route',
            })
        );
    }
    response.end(
        JSON.stringify({
            message: 'Hello World',
        })
    );
}).listen(8080, () => console.log('Server running on 8080'));
