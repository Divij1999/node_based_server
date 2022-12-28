const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const server = http.createServer((req, res) => {
  // Build path to file
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // Finding the extension type of the requested file
  let extType = path.extname(filePath);

  // Finding the content type of the requested file
  let contentType = "text/html";

  switch (extType) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".png":
      contentType = "img/png";
      break;
    case ".jpg":
      contentType = "img/jpg";
      break;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, data) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data, "utf8");
        });
      } else {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end(`Server error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data, "utf8");
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is running"));
