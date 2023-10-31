import instance from "./axiosConfig";

const API_URL = "/api/exchanges";

const createExchange = (data) => {
    return instance.post(`${API_URL}`, data);
}

export {
    createExchange
}