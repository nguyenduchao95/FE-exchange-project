import instance from "./axiosConfig";
import {createAsyncThunk} from "@reduxjs/toolkit";

const API_URL = "/api/accounts";
const getAllPostsByAccountId = (accountId, page = 0, size = 5) => {
    return instance.get(`${API_URL}/${accountId}/posts?page=${page}&size=${size}`);
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

const changeAccountPassword = (id, data) => {
    return instance.put(`${API_URL}/password/${id}`, data);
}

const checkPasswordById = (id, data) => {
    return instance.post(`${API_URL}/check-password/${id}`, data);
}

const checkEmail = (account) => {
    return instance.post(`${API_URL}/check-email`, account);
}


export {
    getAllPostsByAccountId,
    listUserAndUnreadMessage,
    searchUsersMessage,
    getAccountById,
    editAccountInformation,
    changeAccountPassword,
    checkPasswordById,
    checkEmail
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
