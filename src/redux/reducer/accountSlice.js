import {createSlice} from "@reduxjs/toolkit";
import {getAccountLogin, removeAccount} from "../../service/accountService";


const initialState = {
    account: localStorage.getItem("account") ?
        JSON.parse(localStorage.getItem("account")) :
        {},
    unreadMessage: 0,
    unreadNotify: 0,
    notifyList: [],
    toggleStatus: true
};

const accountSlice = createSlice({
    name: "myState",
    initialState,
    reducers: {
        editAccount: (state, action)=>{
            console.log(action)
            state.account = action.payload;
        },
        countUnreadMessage: (state, action)=>{
            state.unreadMessage = action.payload;
        },
        countUnreadNotify: (state, action)=>{
            state.unreadNotify = action.payload;
        },
        getAllNotify: (state, action)=>{
            state.notifyList = action.payload;
        },
        changeStatus: (state)=>{
            state.toggleStatus = !state.toggleStatus;
        },
    },
    extraReducers: builder => {
        builder.addCase(getAccountLogin.fulfilled, (state, action) => {
            state.account = action.payload;
        })
        builder.addCase(removeAccount.fulfilled,(state, action)=>{
            state.account = null;
        })
    }
})

export const {
    editAccount,
    countUnreadMessage,
    countUnreadNotify,
    getAllNotify,
    changeStatus
} = accountSlice.actions
export default accountSlice.reducer;