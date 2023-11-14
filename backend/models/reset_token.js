const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const tokenSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: "user",
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});
tokenSchema.plugin(unique);
module.exports = mongoose.model("token", tokenSchema);