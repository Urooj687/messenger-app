var ChatModel = require('./chat.model.js');
var UserModel = require('../user/userModel.js');
module.exports = {
    init: init
}
function init(socket) {
    console.log("Initializing Socket");
    socket.on('this is username', data => setUserSocket(socket, data));
    socket.on('send', data => send(socket, data));
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
}
function setUserSocket(socket, userName) {

    socket.join(userName)
}
async function send(socket, data) {
    try {
        const { value, sender, recipient } = data;
        console.log({ value, sender, recipient })
        const text = {
            date: new Date(),
            sender,
            recipient,
            value,
        }
        const senderID = await UserModel.findOne({ 'userName': sender })
        if (!senderID) {
            console.log(senderID)
            return
        }
        const receiverID = await UserModel.findOne({ 'userName': recipient })
        if (!receiverID) {
            console.log(receiverID)
            return
        }
        console.log(senderID._id, receiverID._id)
        let currentChat = await ChatModel.findOne({
            '$or': [{
                initiator: senderID._id,
                receiver: receiverID._id
            },
            {
                receiver: senderID._id,
                initiator: receiverID._id
            }
            ]
        })
        if (!currentChat) {
            currentChat = new ChatModel({
                initiator: senderID.id,
                receiver: receiverID.id,

            })
            await currentChat.save();

        }

        await ChatModel.updateOne(
            { _id: currentChat.id },

            { $push: { 'texts': text } });

        socket.to(recipient).emit('receive', data);

    } catch (error) {
        console.error(error)
    }
}
