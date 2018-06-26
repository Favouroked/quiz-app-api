var express = require('express');
var router = express.Router();
const passport = require('passport');
const mongoose= require('mongoose');
const User = require('../models/user');
var Quiz = require('../models/quiz');
const Question = require('../models/question');
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({"message": "Welcome to the quiz app. Start now"});
});


router.get('/get-quiz', function (req, res) {
    Quiz.find({}, (err, quiz) => {
        if (err) throw err;
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Credentials', true)
        return res.status(200).json(quiz);
    });
});

router.post('/add-quiz', (req, res) => {
    console.log(req.body);
    Quiz.create(req.body, (err, quiz) => {
        if (err) throw err;
        return res.status(200).json(quiz);
    });
});

router.get('/get-questions', (req, res) => {
    const quiz_id = req.param('id');
    console.log('Quiz id', quiz_id);
    Question.find({quiz_id: quiz_id}, (err, questions) => {
        if (err) throw err;
        res.status(200).json(questions);
    });
});

router.post('/add-questions', (req, res) => {
    console.log(req.body);
    Question.create(req.body, (err, created) => {
        if (err) throw err;
        if (created) res.json({success: true});
    });
});

router.post('/register', (req, res) => {
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token": token
    });
  });
});

router.post('/login', (req, res) => {
  passport.authenticate('local', function(err, user, info) {
    var token;

    if (err) {
      res.status(404).json(err);
      return;
    }

    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
    } else {
      res.status(401).json(info);
    }
  });
});

router.get('/profile', auth, (req, res) => {
  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec((err, user) => {
        res.status(200).json(user);
      });
  }
});

module.exports = router;
