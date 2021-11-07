import {UserModel} from './user.model'
import { createStore } from 'easy-peasy';
import { ChatModel } from './chat.model'

export const store = createStore({
    
    user: UserModel,
    chat: ChatModel
    
    //notifications: thunk(notificationsReducer())
});