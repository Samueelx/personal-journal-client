import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://personal-journal-app-qr1s.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    },
});

export default axiosInstance;