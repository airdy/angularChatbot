const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BotsSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    img: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('bots', BotsSchema);