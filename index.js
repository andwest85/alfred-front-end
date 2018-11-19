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
  res.render('index.html')
})
app.listen(process.env.PORT);

module.exports = app;
