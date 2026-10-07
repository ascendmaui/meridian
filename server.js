const http = require('http');
const fs = require('fs');
const path = require('path');
console.log('Server script starting');
const port = parseInt(process.env.PORT || '8080', 10);

const server = http.createServer((req, res) => {
  try {
    console.log(`${req.method} ${req.url} - ${req.headers["user-agent"] || "no ua"}`);
    
    // Add headers that might help with Lighthouse/CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }
    
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    switch (ext) {
      case '.js':
        contentType = 'application/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
        contentType = 'image/jpeg';
        break;
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // Page not found
          fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content || '404 Not Found', 'utf8');
          });
        } else {
          // Server error
          res.writeHead(500);
          res.end('Server Error: ' + err.code, 'utf8');
        }
      } else {
        // Success
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf8');
      }
    });
  } catch (err) {
    console.error('Error in request handler:', err);
    res.writeHead(500);
    res.end('Internal Server Error', 'utf8');
  }
});

server.listen(port, "localhost");
server.on("listening", () => {
  console.log(`Server running at http://localhost:${port}/`);
});
server.on("error", (err) => {
  console.error("Server error:", err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
