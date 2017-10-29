var mongoose = require('mongoose');
var session = require('express-session');
var User = mongoose.model('User');
var users = require('../controllers/users.js');
var questions = require('../controllers/questions.js');
const path = require('path');

module.exports = function (app) {

	// USER ROUTES
	app.get('/whosLoggedIn', (req, res) => {
		res.json({user: req.session.user});
	})

	app.get('/getLoggedUser', (req, res) =>{
		users.getLoggedUser(req, res);
	})

	app.post('/login', (req, res) => {
		users.login(req, res);
	})

	app.get('/getUser/:id', (req, res) =>{
		users.getUser(req, res);
	})

	app.post('/users/search', (req, res) =>{
		users.search(req, res);
	})

	app.get('/logout', (req, res) =>{
		if(req.session.user != undefined){
			console.log(req.session.user.name, "logged out.");
		}
		req.session.user = undefined;
		res.json("Logged out");
	})

	// QUESTION ROUTES

	app.post('/createQuestion', (req, res) =>{
		console.log("createQuestion route");
		questions.create(req, res);
	})

	app.get('/showAllQuestions', (req, res)=>{
		questions.showAll(req, res);
	})

	app.delete('/deleteQuestion/:id', (req, res)=>{
		questions.deleteQuestion(req, res);
	})

	app.get('/showOneQuestion/:id', (req, res)=>{
		questions.showOneQuestion(req, res);
	})

	app.post('/questions/search', (req, res) =>{
		questions.search(req, res);
	})

	app.post('/updateQuestion', (req, res)=>{
		questions.updateQuestion(req, res);
	})


	// EVERYTHING ELSE
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/index.html"))
	})
}