var http = require('http')
var file = require('fs')

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'ContentType': 'text/html'})

  var readFile = file.createReadStream(__dirname + '/index.html', 'utf8')

  readFile.pipe(res)
})

server.listen(8080, 'localhost')
console.log('server run');
