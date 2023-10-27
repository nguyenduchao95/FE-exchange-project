import axios from "axios";

const API_URL = "http://localhost:8080"
const getAllPosts = (page = 0, size = 12) => {
    return axios.get(`${API_URL}/api/posts?page=${page}&size=${size}`);
}

const getPostById = (postId) => {
    return axios.get(`${API_URL}/api/posts/${postId}`);
}

export {
    getAllPosts,
    getPostById
};