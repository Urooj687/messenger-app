var ChatModel = require('./chat.model.js');
var UserModel = require('../user/userModel');
const config = require('../config.json')
const axios = require('axios')


module.exports = {
    
    getChat
}


async function getChat(req, res) {
    let chat = await ChatModel.findOne({
        '$or': [
            { initiator: req.params.userName, receiver: req.params.receiver }, {
                receiver: req.params.userName, initiator: req.params.receiver
            }
        ]

    })
    if (!chat) {
        
        chat = new ChatModel({
            initiator: req.params.userName, 
            receiver: req.params.receiver,
            texts: []
        });

        await chat.save();
    }
    return res.json(chat);
}
