import React, { useState, useEffect } from 'react'
import './chatInterface.css';
import { action, useStoreActions, useStoreState } from 'easy-peasy';
import './chatInterface.css';

export default function ChatInterface({ match }) {
    const login = useStoreActions(actions => actions.user.login);
    const userName = match.params.userName;
    const messages = useStoreState(state => state.chat.messages);
    const [lastMessage, setLastMessage] = useState(null);
    const [message, setMessage] = useState('');
    const [recipient, setRecipient] = useState("")
    const send = useStoreActions(actions => actions.chat.send)
    const room = useStoreState(state => state.chat.activeRoom);
    const setUserSocket = useStoreActions(actions => actions.chat.setUserSocket)
    const localStorageUser = useStoreState(state => state.user.id)
    const users = useStoreState(state => state.user.users)
    const listUsers = useStoreActions(actions => actions.user.listUsers);
    const getChat = useStoreActions(actions => actions.chat.getChat)
    useEffect(() => {
        login(match.params.userName)
    }, [])
    useEffect(() => {
        if (lastMessage) {
            lastMessage.scrollIntoView({ behavior: "smooth" });
        }
    })
    useEffect(() => {
        console.log("hi!")
        listUsers(userName)
    }, [])
    useEffect(() => {
        if (userName) {
            setUserSocket(userName)
        }
    }, [])
    function sendMessage(event) {
        event.preventDefault();
        if (message) {
            send({ value: message, sender: userName, recipient: recipient });
            setMessage('');
        }
    }
    function handleSetActiveRoom(value) {
        setRecipient(value.userName)
        getChat({ userName: localStorageUser, receiver: value._id })
    }
    function getContactName(value) {
        return value.sender
    }
    return (<>
        <div className="h-100 w-100 position-absolute d-flex">
            <div className={`m-2 flex-grow-1 d-flex shadow-sm container}`}>
                <div className={`d-flex flex-column sidebar col-md-3`}>
                    <div className="my-1">
                        <h3>List of Connected Users</h3>
                        <div className="d-flex justify-content-center mr-2 my-3 searchedUser">
                            <div className={`flex-grow-1 rooms`}>
                                {
                                    users.map((value, index) => {
                                        return <div onClick={() =>
                                            handleSetActiveRoom(value)} key={index} className={`room ${room.id === value.id ? 'active' : ''}`}>
                                            <div className={`title`}>{
                                                value.userName
                                            }
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`flex-grow-1 d-flex flex-column messagesContainer col-md-9`}>
                    <div className={`header d-flex align-items-center pl-4`}>
                        <h3 id="title">{
                            recipient ? recipient : 'Messages'
                        }</h3>
                    </div>
                    <div className={`flex-grow-1 messages`}>
                        {
                            recipient ?
                                messages.map((message, index) => (
                                    <div key={index} className={`d-flex flex-column message`} ref={(el) => { setLastMessage(el); }}>
                                        <div className={`nameAndText`}>
                                            <div className={`font-weight-bold`}>{getContactName(message)}</div>
                                            <div className={`text`}>

                                                {message.value}
                                            </div>
                                        </div>
                                        {index !== (messages.length - 1) ? <div className={`borderBottom`}></div> : ''}
                                    </div>
                                ))
                                : ''
                        }
                    </div>
                    <form className={`d-flex p-4 messageInputContainer`} onSubmit={(event) => sendMessage(event)}>
                        <input value={message} onChange={(event => setMessage(event.target.value))} className={`rounded-0 flex-grow-1 mr-2`} type="text" />
                        <button className="btn btn-success px-4">Send</button>
                    </form>
                </div>
            </div>
        </div>
    </>)

}
