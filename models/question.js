var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    quiz_id: { type: Schema.Types.ObjectId, ref: 'Quiz' },
    question: { type: String },
    time: { type: String },
    options: [],
    answer: { type: String }
});

module.exports = mongoose.model('Question', QuestionSchema);