import axios from 'axios';
import config from '../config.json';
import io from 'socket.io-client';
import { store } from '../store/store'
const socket = io(config.socketHost);
const { action, thunk } = require("easy-peasy");
export const ChatModel = {
    activeRoom: {
        id: null,
        initiator: {},
        receiver: {},
        texts: [],
    },
    messages: [], rooms: [],
    pushMessages: action((state, payload) => {
        state.messages = [...state.messages, payload];
        console.log(state.messages)
    }),
    setMessages: action((state, payload) => {
        state.messages = payload;
    }),
    setActiveRoom: action((state, payload) => {
        state.activeRoom = payload
        console.log(state.activeRoom)
    }),
    setUserSocket: thunk(async (actions, payload) => {
        socket.emit('this is username', payload);
    }),
    getChat: thunk(async (actions, payload) => {
        try {
            const chat = await axios.get(`${config.apiUrl}/chats/${payload.userName}/${payload.receiver}`);
            actions.setActiveRoom(chat.data);
            actions.setMessages(chat.data.texts)
            
        }
        catch (error) {
            console.error(error)
        }
    }),
    
    send: thunk(async (actions, { value, sender, recipient }) => {
        socket.emit('send', {
            value,
            sender,
            recipient,
        });
        actions.pushMessages({
            sender,
            recipient,
            value: value,
        })
    }),

}
socket.on('receive', (data) => {
    console.log(data)
    store.dispatch({ type: '@action.chat.pushMessages', payload: { sender: data.sender, recipient: data.recipient, value: data.value } });
})


