var http = require('http');
var fs = require('fs');

/*
myReadStream.on('data', function(chunk){
  console.log('new chunk received');
  writeStream.write(chunk);
});
*/


var server = http.createServer(function(req, res){
  console.log('req was made: '+ req.url);

  // Routing
  if (req.url === "/home" || req.url === "/"){
    res.writeHead(200, {'Content-type': 'text/html'});
    fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res);
  } else if (req.url === "/contact-us"){
    res.writeHead(200, {'Content-type': 'text/html'});
    fs.createReadStream(__dirname + '/contact.html', 'utf8').pipe(res);
  } else if (req.url === "/api/ninjas"){
    var ninjas = [{name: 'ryu', age: 29}, {name: 'yoshi', age: 32}];
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(JSON.stringify(ninjas));
  } else{
    res.writeHead(404, {'Content-type': 'text/html'});
    fs.createReadStream(__dirname + '/404.html', 'utf8').pipe(res);
  }



  // Similar to fs.readFile and fs.writeFile except chunks the data
  //var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
  //var writeStream = fs.createWriteStream(__dirname + '/writeme.txt');
  // same as listening to the events
  //myReadStream.pipe(res);

  //res.end('Sup men'); No need for this since we're piping the data to res
});

var port = 3000;
var ip = '127.0.0.1';
server.listen(port, ip);
console.log('Listening to '+port);
