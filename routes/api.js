var express = require('express');
var router = express.Router();
var Quiz = require('../models/quiz');
const Question = require('../models/question');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({"message": "Welcome to the quiz app. Start now"});
});


router.get('/get-quiz', function (req, res) {
    Quiz.find({}, (err, quiz) => {
        if (err) throw err;
        res.json(quiz);
    });
});

router.post('/add-quiz', (req, res) => {
    Quiz.create(req.body, (err, quiz) => {
        if (err) throw err;
        res.json({success: true});
    });
});

router.get('/get-questions', (req, res) => {
    const quiz_id = req.param('id');
    Question.find({quiz_id: quiz_id}, (err, questions) => {
        if (err) throw err;
        res.json(questions);
    });
});

router.post('/add-questions', (req, res) => {
    Question.create(req.body, (err, created) => {
        if (err) throw err;
        if (created) res.json({success: true});
    });
});

module.exports = router;
