var express = require('express')

var app = express()

app.get('/', function(req, res) {
  res.send('welcome node js')
})

app.get('/contact', function(req, res) {
  res.sendFile(__dirname + '/index.html', 'utf8')
})

app.listen(8080)

