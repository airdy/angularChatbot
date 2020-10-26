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
        ref: 'bots',
        type: mongoose.Types.ObjectId
    }
});

module.exports = mongoose.model('chats', DialogsSchema);