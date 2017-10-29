var mongoose = require('mongoose');
var session = require('express-session');
var moment = require('moment');
var Question = mongoose.model('Question');
var User = mongoose.model('User');

module.exports = {
    create: (req, res) =>{
        console.log("Do we make it into the controller?");
        req.session.errors = [];
        var question = new Question({
            qtext: req.body.qtext,
            options: req.body.options,
            user: req.session.user._id
        });
        User.findById(req.session.user._id, function(err, thisUser){
            if(err){console.log("Error attempting to retrieve user in questions.create:", err);}
            else{
                thisUser.questions.push(question);
                thisUser.save((err) => {console.log("Error attempting to save user after question creation:",err)});
                question.save((err) =>{
                    if(err){console.log("Error attempting to save question after creation:", err)}
                    else{console.log("Question saved.")}
                })
            }
        });
    },

    showAll: function(req, res){
        Question.find({}).populate('user').exec((err, questions)=>{
            if(err){
                console.log(err);
                res.json({errors: err})
            }
            else{
                res.json({errors: "None", questions: questions});
            }
        })
    },

    showOneQuestion: (req, res) => {
        Question.find({_id: req.params.id}).populate('user').exec((err, question)=>{
            if(err){
                console.log("Error retreiving one question:", err);
            }
            else{
                res.json({question: question});
            }
        })
    },

    deleteQuestion: (req, res) => {
        var question = Question.findByIdAndRemove({_id: req.params.id}, err=>{
            if(err){console.log("Error on question delete:", err)}
            else{
                thisUser = User.findById(req.session._id).populate('questions').exec(
                    err=>{console.log(err)}, thisUser=>{
                        thisUser.save();
                        console.log("User updated.")});
                console.log("Question deleted.")};
        })
    },

    getUsersQuestions: (req, res) => {
        Question.find({user: req.session.user._id}, (err, questions) =>{
            if(err){console.log("Error attempting to get questions by user:", err)}
            else{
                console.log("Found these questions:", questions);
                res.json({questions: questions});
            }
        })
    },

    search: (req, res) =>{
        console.log("Searching for:", req.body);
        var regx = new RegExp(req.body.query, 'i');
        Question.find({qtext: {$regex: regx}}).populate('user').exec((err, results) =>{
            if(err){
                console.log("Err on searching questions:\n", err)
            }
            else{
                res.json({results: results});
            }
        })
    },

    updateQuestion: (req, res) => {
        Question.findByIdAndUpdate(req.body._id, {$set: {options: req.body.options}}, (err, thisQuestion)=>{
            if(err){
            console.log("Error in controller attempting to update question:", err);
            }
            else{
                console.log("Question saved.");
                thisQuestion.save();
            }
        })
    }
}