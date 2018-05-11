var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuizSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: 'Category'},
    question: String,
    time: String,
    options: [],
    answer: String,
});

module.exports = mongoose.model('Quiz', QuizSchema);