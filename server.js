const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {

  // SERVE WEBSITE FILES
  let filePath;

  if (req.url === "/") {
    filePath = path.join(__dirname, "index.html");
  } else {
    filePath = path.join(__dirname, req.url.slice(1));
  }

  const ext = path.extname(filePath);

  const contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript"
  };

  console.log("Requested URL:", req.url);
  console.log("Trying to open:", filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentTypes[ext] || "text/plain"
    });

    res.end(data);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});