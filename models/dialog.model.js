const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DialogsSchema = new Schema({
    value: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    _botsId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('chats', DialogsSchema);