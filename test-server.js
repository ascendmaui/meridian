const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 8080;

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/truetype',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'font/opentype',
    '.frag': 'text/plain',
    '.vert': 'text/plain'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        fs.readFile('./404.html', (err, content) => {
          const headers = {
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength(content, 'utf-8'),
            'Date': new Date().toUTCString()
          };
          res.writeHead(404, headers);
          res.end(content, 'utf-8');
        });
      } else {
        const errorMsg = `Server Error: ${error.code}`;
        const headers = {
          'Content-Type': 'text/plain',
          'Content-Length': Buffer.byteLength(errorMsg, 'utf-8'),
          'Date': new Date().toUTCString()
        };
        res.writeHead(500, headers);
        res.end(errorMsg, 'utf-8');
      }
    } else {
      const headers = {
        'Content-Type': contentType,
        'Content-Length': Buffer.byteLength(content, 'utf-8'),
        'Date': new Date().toUTCString()
      };
      res.writeHead(200, headers);
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
