import axios from "axios";

const API_URL = "http://localhost:8080/api/posts"
const getAllPosts = (page = 0, size = 12, status = '', username = '', title = '') => {
    return axios.get(`${API_URL}?page=${page}&size=${size}&status=${status}&username=${username}&title=${title}`);
}

const getPostById = (postId) => {
    return axios.get(`${API_URL}/${postId}`);
}

export {
    getAllPosts,
    getPostById
};