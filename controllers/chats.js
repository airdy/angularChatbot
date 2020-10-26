const Chat = require('../models/dialog.model');

//get all recipes from specific list
module.exports.get = (req, res) => {
    Chat.find({
        _botsId: req.params.botsId
    }).then((chats) => {
        res.send(chats);
    });
};

//create new recipes in the list specified by id
module.exports.post = (req, res) => {
    let newChat = new Chat({
        value: req.body.value,
        _botsId: req.params.botsId
    });
    newChat.save().then((newChatDoc) => {
        res.send(newChatDoc);
    }).catch((e) => {
        res.send(e)
    });
};