var express = require('express')
var mysql = require('mysql')
var app = express()

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'demo_api'
})

connection.connect(function(err) {
  if(err) throw err;
  console.log('db connected')
})

app.get('/api/product', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  connection.query("SELECT * FROM products", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
})

app.get('/products/:name', function(req, res) {
  let name = req.query.name
  console.log(req.query)
  if (!name) {
    return res.status(400).send({ error: true, message: 'Please provide name' });
  }

  connection.query('SELECT * FROM products where name=?', name, function (error, results, fields) {
    if (error) throw error;
     return res.send({ error: false, data: results, message: 'users list.' });
   });
})

app.listen(3000)

