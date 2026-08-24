import axios from "axios";

const api = axios.create({
    baseURL:"https://quicknotes-api-backend.onrender.com/api"
});

export default api;