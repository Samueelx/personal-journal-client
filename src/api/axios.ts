import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://personal-journal-app-qr1s.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    },
});

/**Request interceptor to include the token in the Auth header. */
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export default axiosInstance;