
const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    service_taken: { type: Array, default: [] },
    verified: { type: Boolean, default: false },
    confirmation_code: { type: String, required: true },
    rdv: { type: Boolean, default: true }
})
userSchema.plugin(unique);
module.exports = mongoose.model('user', userSchema);