var express        = require('express');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var cookieParser     = require('cookie-parser');
var session     = require('express-session');
var methodOverride = require('method-override');
var multer  = require('multer');
var upload = multer({dest:'public/uploads/'});
mongoose.Promise = require('bluebird');
var db = "mongodb://localhost:27017/miniproject";

var app  = express();


// var db = require('./config/db');

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret:"hell",resave:false, saveUninitialized:true}));
require('./app/routes')(app);  
require('./app/models/Student');  
require('./app/models/Portfolio'); 
require('./app/models/Project'); 
require('./app/controllers/studentController');  

app.set('view engine','ejs');
app.set('views', './app/views');

app.use(express.static(__dirname + '/public'));
mongoose.connect(db);

app.listen(port);	
console.log('Magic happens on port ' + port); 			
exports = module.exports = app; 