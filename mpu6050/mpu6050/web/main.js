var http = require('http');
var url = require('url');
var static = require('node-static');
var file = new static.Server('.');
var fs = require("fs");
var greatList = [];




function accept(req, res) {

  if (req.url == '/mpu6050') {  
   var fileContent = fs.readFileSync("/sys/class/mpu6050/all", "utf8");

   
     res.end(JSON.stringify(fileContent));
    
  } else {
    file.serve(req, res);
  }
}



// ------ этот код запускает веб-сервер -------

if (!module.parent) {
    http.createServer(accept).listen(8080);
} else {
    exports.accept = accept;
}













function listClosures(way) {
   
    fs.readdir(way, function (err, items) {
        for (var i = 0; i < items.length; i++) {
            var file = way + '/' + items[i];
            var mas = {
                path: file,
                name: items[i]
            }
            var st = fs.statSync(file);
            if (st.isFile()) {
                greatList.push(mas);
            }
            if (st.isDirectory()) {
                listClosures(file);
            }
        }
    })
}
