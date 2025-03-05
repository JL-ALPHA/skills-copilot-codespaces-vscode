// Create web server
// Create a server that listens on port 8080
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const comments = [];

http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);

    if (req.method === 'POST' && pathname === '/comment') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const comment = JSON.parse(body);
            comments.push(comment);
            res.end('OK\n');
        });
    } else if (req.method === 'GET' && pathname === '/comments') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(comments));
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
}).listen(8080);