import {createSlice} from "@reduxjs/toolkit";
import {getAccountLogin, removeAccount} from "../../service/accountService";


const initialState = {
    account: JSON.parse(localStorage.getItem('account'))
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: [],
    extraReducers: builder => {
        builder.addCase(getAccountLogin.fulfilled, (state, action) => {
            state.account = action.payload;
        })
        builder.addCase(removeAccount.fulfilled,(state, action)=>{
            state.account = null;
        })
    }
})
export default accountSlice.reducer;