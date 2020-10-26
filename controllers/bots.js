const Bots = require('../models/bots.model');

module.exports.get = (req, res) => {
    Bots.find().then ((bots) => {
        res.send(bots);
    }) .catch((e) => {
        res.send(e)
    });
};
module.exports.post = (req, res) => {
    let name = req.body.name;
    let img = req.body.img;
    console.log(Bots);
    let newBot = new Bots ({
        name,
        img
    });
    newBot.save().then((botDoc) => {
        res.send(botDoc);
    })
};
