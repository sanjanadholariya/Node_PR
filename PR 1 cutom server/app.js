  const { log } = require('console');
  const fs = require('fs');
  const http = require('http');
  const port = 8001;


  const requestHandler = (req, res) => {

    console.log(req.url);

    let filename = "";

    switch (req.url) {
      case "/":
        filename = "./index.html"
        break;
      case "/about":
        filename = "./about.html"
        break;
      case "/blog":
        filename = "./blog.html"
        break;
      case "/contact":
        filename = "./contact.html"
        break;
      case "/product":
        filename = "./product.html"
        break;
      default:
        filename = "./index.html"
        break;
    };

    console.log(filename);
    

    fs.readFile(filename, (err, data) => {
      if (err) {
        console.log(err);
        res.end("<h1>Internal Server Error</h1>");
        return;
      }
      res.end(data)

    });

  } 

  const server = http.createServer(requestHandler);

  server.listen(port)