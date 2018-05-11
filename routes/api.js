var express = require('express');
var router = express.Router();
var Category = require('../models/category');
var Quiz = require('../models/quiz');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({"message": "Welcome to the quiz app. Start now"});
});

router.post('/categories', function(req, res) {
    var newCategoryName = req.body.category;
    Category.create({name: newCategoryName}, function(err, category) {
        if (err) { throw err; }
        res.json(category);
    });
});

router.get('/categories', function(req, res) {
    Category.find({}, function(err, categories) {
        if (err) { throw err; }
        res.json(categories);
    });
});

router.post('/quiz', function(req, res) {
    // console.log(req.body);
    var category = req.body.category;
    Category.findOne({name: category}, function(err, category) {
        if (err) throw err;
        req.body.category = category._id;
        Quiz.create(req.body, function(err, quiz) {
            if (err) throw err;
            res.json(quiz);
        });
    });
    res.json({message: "Nothing could be done"});
});

router.get('/quiz', function(req, res) {
    // Quiz.find({}, function(err, quizzes) {
    //     res.json(quizzes);
    // });
    Quiz
        .find({})
        .populate('category')
        .exec(function(err, quizzes) {
            if (err) throw err;
            res.json(quizzes);
        });
});
module.exports = router;
