const mongoose = require('mongoose');
const RDVschema = mongoose.Schema(
  {
    number: { type: String, required: true },
    userId: { type: String, required: true },
    nom_complet: { type: String, required: true },
    valid: { type: Boolean },
    note: { type: String, required: true },
    waiting: { type: Boolean },
    date: { type: String, required: true }
  })
module.exports = mongoose.model('RDV', RDVschema);