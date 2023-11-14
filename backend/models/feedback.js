const mongoose = require('mongoose');
const Feedbackschema = mongoose.Schema(
    {
        userId: { type: String, required: true },
        name: { type: String },
        date: { type: Date, required: true },
        content: { type: String, required: true },
        stars: { type: Number, enum: [1, 2, 3, 4, 5], required: true }
    })

module.exports = mongoose.model('feedback', Feedbackschema);