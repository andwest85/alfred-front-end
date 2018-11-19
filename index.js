var express    = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

var api = require('./routes/api');
app.use('/api', api);

app.set('views', __dirname+'/client');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('*', function (req, res, next) {
  console.log('HITTING GET ROUTE');
  res.render('index.html')
})

var port = process.env.PORT || 8000;

app.listen(port, function() {
    console.log("App is running on port " + port);
});

module.exports = app;
