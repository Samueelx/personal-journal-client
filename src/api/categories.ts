import axiosInstance from "./axios";

export const fetchCategories = async() => {
    const response = await axiosInstance.get('/categories');
    return response.data;
}