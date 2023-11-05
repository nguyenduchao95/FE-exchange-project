import instance from "./axiosConfig";
import {createAsyncThunk} from "@reduxjs/toolkit";

const API_URL = "/api/accounts";
const getAllPostsByAccountId = (accountId, page = 0, size = 5, data) => {
    return instance.post(`${API_URL}/${accountId}/posts?page=${page}&size=${size}`, data);
}

const listUserAndUnreadMessage = (accountId) => {
    return instance.get(`${API_URL}/${accountId}/messages`);
}
const searchUsersMessage = (accountId, username) => {
    return instance.get(`${API_URL}/${accountId}/messages/search?username=${username}`);
}

const getAccountById = (id) => {
    return instance.get(`${API_URL}/${id}`);
}

const editAccountInformation = (id, data) => {
    return instance.put(`${API_URL}/${id}`, data);
}

const changeAccountPassword = (accountId, data) => {
    return instance.put(`${API_URL}/${accountId}/change-password`, data);
}

const checkPasswordByAccountId = (accountId, data) => {
    return instance.post(`${API_URL}/${accountId}/check-password`, data);
}

const getAllExchangesByAccountId = (accountId, page = 0, size = 10, data) => {
    return instance.post(`${API_URL}/${accountId}/exchanges?page=${page}&size=${size}`, data);
}

const getPostPinByAccountSellAndAccountBuy = (accountSell, accountBuy) => {
    return instance.get(`${API_URL}/${accountSell}/${accountBuy}/post-pin`);
}

const createPost = (data) =>{
    return instance.post(`${API_URL}/posts`, data);
}

const editPost = (data) =>{
    return instance.put(`${API_URL}/posts/${data.id}`, data);
}


export {
    getAllPostsByAccountId,
    listUserAndUnreadMessage,
    searchUsersMessage,
    getAccountById,
    editAccountInformation,
    changeAccountPassword,
    checkPasswordByAccountId,
    getAllExchangesByAccountId,
    getPostPinByAccountSellAndAccountBuy,
    createPost,
    editPost
};

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
