var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuizSchema = new Schema({
    title: { type: String },
    description: { type: String }
});

module.exports = mongoose.model('Quiz', QuizSchema);