import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getAccountLogin = createAsyncThunk(
    "/login",
    async (account) => {
        return account;
    }
)
export const removeAccount = createAsyncThunk(
    "/removeAccount",
    async () => {
        return {};
    }
)
