import React, {createContext, useEffect, useState} from 'react';
import Stomp from "stompjs";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import _ from "lodash";
import {useNavigate} from "react-router-dom";
import {countUnreadMessagesByReceiverId} from "../../service/messageService";
import {removeAccount} from "../../service/accountService";
import {countUnreadMessage} from "../../redux/reducer/accountSlice";

export const WebSocketContext = createContext(null)
const WebSocketProvider = ({children}) => {
    const [notify, setNotify] = useState({});
    const [messageReceiver, setMessageReceiver] = useState({});
    const account = useSelector(state => state.myState.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let socket;
    let stompClient;
    let ws;

    useEffect(() => {
        if (!_.isEmpty(notify))
            toast.success(`Bạn có 1 thông báo mới từ ${notify?.sender?.username}`, {position: "bottom-right"});
    }, [notify])

    useEffect(() => {
        if (!_.isEmpty(messageReceiver))
            toast.success(`Bạn có 1 tin nhắn mới từ ${messageReceiver?.sender?.username}`, {position: "bottom-right"});
    }, [messageReceiver])

    const sendNotify = (notify) => {
        if (!stompClient) return;
        stompClient.send("/app/notify", {}, JSON.stringify(notify));
    }

    const sendMessage = (message) => {
        if (!stompClient) return;
        stompClient.send("/app/message", {}, JSON.stringify(message));
    }

    const onConnected = () => {
        stompClient.subscribe(`/notify/${account.id}`, onNotifyReceived);
        stompClient.subscribe(`/message/${account.id}`, onMessageReceived);
    }

    const onNotifyReceived = (payload) => {
        const data = JSON.parse(payload.body);
        if (data.content === 'Admin đã khóa tài khoản của bạn') {
            dispatch(removeAccount());
            localStorage.removeItem("account");
            navigate("/403");
        } else {

        }
    }

    const onMessageReceived = (payload) => {
        const data = JSON.parse(payload.body);
        setMessageReceiver(data);
        countUnreadMessagesByReceiverId(account.id).then(response => {
            dispatch(countUnreadMessage(response.data));
        }).catch(error => {
            console.log(error);
        })
    }

    const onError = (err) => {
        console.log(err);
    }

    if (!socket && !_.isEmpty(account)) {
        socket = new WebSocket('ws://localhost:8080/ws/websocket');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    }

    ws = {
        sendNotify,
        sendMessage,
        setMessageReceiver
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketProvider;