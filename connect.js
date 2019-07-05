var express = require('express')
var bodyParser = require('body-parser');
var mysql = require('mysql')
var app = express()

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

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

app.get('/api/users', function(req, res) {
  connection.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
})

app.post('/api/users', function(req, res) {
  let reqUsers = {
    birthday: req.body.birthday,
    email: req.body.email,
    gender: req.body.gender,
    username: req.body.username
  }

  if (!reqUsers.birthday || !reqUsers.email || !reqUsers.gender || !reqUsers.username) {
    return res.status(400).send({ error: true, message: 'Please provide name' });
  }

  connection.query('INSERT INTO users SET ? ', reqUsers , function (error, results) {
    if (error) throw error
    return res.send({ message: 'success', data: results, message: 'users list.', status: 200 })
   });
})

//  Delete user
app.delete('/api/users', function (req, res) {
  let user_id = req.body.id;

  if (!user_id) {
      return res.status(400).send({ error: true, message: 'Please provide user_id' });
  }
  dbConn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
  });
});

app.listen(3000)

