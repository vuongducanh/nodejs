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
//get list user
app.get('/api/users', function(req, res) {
  connection.query("SELECT * FROM users ORDER BY -id", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
})

// create user
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
    var sql = `SELECT * from users where id = ${results.insertId}`

    connection.query(sql, function (error, result) {
      if (error) throw error
      return res.send({ message: 'success', data: result, message: 'users list.', status: 200 })
    })
   })
})

//  Update user with id
app.put('/api/users/:id', function (req, res) {
  let reqUpdateUser = {
    birthday: req.body.birthday,
    username: req.body.username,
    gender: req.body.gender
  }

  if (!req.params.id || !reqUpdateUser.birthday || !reqUpdateUser.username || !reqUpdateUser.gender) {
      return res.status(400).send({ error: user, message: 'Please provide user and user_id' })
  }

  connection.query("UPDATE users SET ? WHERE id = ?", [reqUpdateUser, req.params.id], function (error, results) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'user has been updated successfully.' })
  });
});


//  Delete user
app.delete('/api/users/:id', function (req, res) {
  let id = req.params.id
  if (!id) {
    return res.status(400).send({ error: true, message: 'Please provide user_id' })
  }
  connection.query('DELETE FROM users WHERE id = ?', id , function (error, results) {
      if (error) throw error
      return res.send({ message: 'delete success', data: [], status: 200 })
  });
});

app.listen(3000)

