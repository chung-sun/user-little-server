const express = require('express');
const app = express();
const low = require('lowdb');
const fs = require('lowdb/adapters/FileSync');
const adapter = new fs('db.json');
const db = low(adapter);
const cors = require('cors');

// init data store
db.defaults({ users : []}).write();

// Allow cross-origin resource sharing CORS
app.use(cors());

// static file
app.use(express.static('public'));

// data parser - used to parse post data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

// return all users
app.get('/data', function (req, res) {
    res.send(db.get('users').value());
});

// post route
app.post('/test', function(req, res) {
    console.log(req.body.username, req.body.password);
    res.send(req.body.username + ' ' + req.body.password);
});

// add user
app.post('/add', function (req, res) {
    var user = {
        'name'          : req.body.name,
        'dob'           : req.body.dob,
        'email'         : req.body.email,
        'username'      : req.body.userName,
        'password'      : req.body.password,
        'phone'         : req.body.phone,
        'streetaddress' : req.body.streetaddress,
        'citystatezip'  : req.body.citystatezip,
        'latitude'      : req.body.latitude,
        'longitude'     : req.body.longitude,
        'avatar'        : req.body.avatar
    }
    db.get('users').push(user).write();
    console.log(db.get('users').value());
    res.send(db.get('users').value());
});

// curl post command
// curl -H “Content-Type: application/json” -X POST -d ‘{“username”:”peterparker”,”password”:”secret”}’ http://localhost:3000/test

// Start Server
// ------------------------------------
app.listen(3001, function (err, res) {
    console.log('Running on port 3001!');
});