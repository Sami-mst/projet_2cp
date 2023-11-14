const mongoose = require('mongoose');
const Articleschema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ['article', 'service'], required: true }
  })

module.exports = mongoose.model('article', Articleschema);