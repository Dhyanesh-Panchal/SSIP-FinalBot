const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    MessageName: String,
    ReplyType: {
        type: String,
        value
    }
})