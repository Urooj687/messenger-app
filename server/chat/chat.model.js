var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    'initiator': {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    'receiver': {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    'texts':

        [{
            date: Date,
            sender: String,
            recipient: String,
            value: String

        }]

});

module.exports = mongoose.model('Chat', ChatSchema);