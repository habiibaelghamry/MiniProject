var express = require('express');
var app = express();
var studentController = require('./controllers/studentController');
var multer  = require('multer');
var upload = multer({dest:'public/uploads/'});


module.exports = function(app) {

	app.get('/', studentController.getPortfolios);

	app.get('/views/studentsp.ejs', studentController.getPortfoliosS);

	app.get('/studentsp.ejs', studentController.getPortfoliosS);


	app.get('/views/register.html', function(req, res) {
		res.sendFile(__dirname + '/views/register.html');
	});

	app.get('/views/login.html', function(req, res) {
		res.sendFile(__dirname + '/views/login.html');
	});

    app.post('/try', function(req, res) {
		res.render('studentPage');
	});
	
	app.get('/try',function(req, res) {
	res.render('studentPage');
	});

	app.post('/views/portfolio.ejs', function(req, res) {
		res.render('portfolio');
	});
	
	app.get('/views/portfolio.ejs',function(req, res) {
	res.render('portfolio');
	});

	app.post('/views/update.ejs', function(req, res) {
		res.render('update');
	});
	
	app.get('/views/update.ejs',function(req, res) {
	res.render('update');
	});

	app.post('/views/createlink.ejs', function(req, res) {
		res.render('createlink');
	});
	
	app.get('/views/createlink.ejs',function(req, res) {
	res.render('createlink');
	});

	app.post('/views/ulink.ejs', function(req, res) {
		res.render('ulink');
	});
	
	app.get('/views/ulink.ejs',function(req, res) {
	res.render('ulink');
	});

	app.post('/views/createscreen.ejs',upload.any(), function(req, res) {
		res.render('createscreen');
	});
	
	app.get('/views/createscreen.ejs',function(req, res) {
	res.render('createscreen');
	});

	app.post('/views/uscreen.ejs', function(req, res) {
		res.render('uscreen');
	});
	
	app.get('/views/uscreen.ejs',function(req, res) {
	res.render('uscreen');
	});

	app.post('/views/done.ejs',upload.single('pp'), studentController.createPortfolio);

	app.post('/views/done1.ejs',upload.single('pp'), studentController.addPic);


 	app.post('/views/profpic.ejs', upload.single('work'), studentController.createPortfolioScreen);

	app.post('/views/doneU.ejs', studentController.updatePortfolio);


	// app.post('/bateekh', function(req, res) {
	// 	res.render('studentPageL');
	// });
	
	// app.get('/bateekh',function(req, res) {
	// res.render('studentPageL');
	// });

	app.post('/ref',studentController.refresh);
	app.post('/trial', studentController.getName);

	app.get('/trial',function(req, res) {
	res.render('studentPage.ejs');
	});


	

	app.post('/register.html', function(req, res) {
	res.sendFile('./register.html');
	});

	app.post('/login.html', function(req, res) {
	res.sendFile('./login.html');
	});

	app.post('/views/studentPage.ejs', studentController.createStudent);

	app.get('/views/studentPage.ejs', function(req, res) {
	res.render('studentPage');
	});

	app.post('/views/studentPageL.ejs', studentController.findStudent);
	app.get('/views/studentPageL.ejs', studentController.findStudent);

	app.post('/studentPageL.ejs', studentController.getProfile);
	app.get('/studentPageL.ejs', studentController.getProfile);

	app.post('/abc', studentController.getProfile);
	app.get('/abc', studentController.getProfile);

	// app.get('/views/studentPageL.ejs', function(req, res) {
	// res.render('studentPageL');
	// });



};

