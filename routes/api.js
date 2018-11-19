var express = require('express');
var app = express();
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var axios = require('axios');
require('dotenv').config();

router.post('/login', function (req, res, next) {
    if (req.body.username != process.env.USERNAME || !bcrypt.compareSync(req.body.password, process.env.PASSWORD))
        { res.json({error: "username or password is incorrect"}); return; }
    if (req.body.username === process.env.USERNAME && bcrypt.compareSync(req.body.password, process.env.PASSWORD))
      { token = jwt.sign({username: req.body.username, password: req.body.password}, process.env.SECRET);
      res.json({token: token, username: req.body.username}); return; }
});

router.get('/rooms', function(req, res, next) {
    axios.get('https://api.ciscospark.com/v1/rooms', { headers: { Authorization: 'Bearer '+ process.env.ACCESS_TOKEN } })
    .then(function(data) {
        res.json(data.data.items);
    }).catch(function(err) {
        res.json(res.error)
    })
});

router.post('/auth', function(req, res, next) {
    var token = jwt.decode(req.body.data);
    if(token && token.username === process.env.USERNAME && bcrypt.compareSync(token.password, process.env.PASSWORD)) {
      console.log("AUTHENTICATED");
      res.json(true);
    } else {
      console.log("LOGIN NOT AUTHENTICATED");
      res.json(false);
    }
});

router.post('/message', function (req, res, next) {
   for (var i = 0; i < req.body.roomIds.length; i++) {
     axios.post('https://api.ciscospark.com/v1/messages', {roomId: req.body.roomIds[i], text: req.body.text}, { headers: { Authorization: 'Bearer '+ process.env.ACCESS_TOKEN } } ).then(function(data) {
       res.json({data: "SUCCESS!"});
     }).catch(function(err) {
       res.json({data: false});
       console.error("ERROR: ", err);
     });
   }
});

module.exports = router;
