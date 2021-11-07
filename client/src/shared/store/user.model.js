import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';

const { action, thunk } = require("easy-peasy");




let user = {
    userName: "",
    id: ""
};



export const UserModel = {

    id: user.id,
    userName: user.userName,
    loading: false, searchedUser: "",
    recipientId: "", users: [],
    toggleLoading: action((state, payload) => {
        state.loading = payload;
    }),

    updateUser: action((state, payload) => {
        state.userName = payload.userName
        state.id = payload._id
    }),
    
    setUsers: action((state, payload) => {
        state.users = payload
    }),

    
    login: thunk(async (actions, payload) => {
        try {
            actions.toggleLoading(true);
            const userName = payload;

            const res = await axios.get(`${config.apiUrl}/user/${userName}`)
            console.log(res.data)
            actions.updateUser(res.data);
            toastr.success("login successful")
        } catch (error) {
            //actions.loginError("Username incorrect.")

        }
        actions.toggleLoading(false);
    }),
    signup: thunk(async (actions, payload) => {
        const userName = payload;
        console.log(userName)
        try {
            actions.toggleLoading(true);
            const user = await axios.post(`${config.apiUrl}/user/`, { userName })
            actions.updateUser(user.data);
            //console.log(res)
            toastr.success("Signup Successfully")
        } catch (error) {
            toastr.error("");
        }
        actions.toggleLoading(false);
    }),
    
    listUsers: thunk(async (actions, payload) => {
        try {
            console.log("listUsers called")
            const users = await axios.get(`${config.apiUrl}/user/${payload}/find-list`);
            actions.setUsers(users.data)


        }
        catch (error) {
            console.error(error)

        }


    })


};