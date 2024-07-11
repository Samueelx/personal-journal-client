import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { ErrorResponse } from "../types/ErrorResponse";
import { AxiosError } from "axios";
import { format } from 'date-fns';
import CategoryContext from "../context/CategoryContext";

const AddEntry: React.FC = () => {
    const {categoryId } = useContext(CategoryContext);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        try {
            const formattedDate = format(new Date(date), 'MM/dd/yyyy');
            console.log({ title, content, categoryId, date: formattedDate });
            const response = await axiosInstance.post('/journals', {
                title, content, categoryId, date: formattedDate
            });
            if (response.status === 201) {
                navigate('/dashboard');
            }
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response && axiosError.response.data) {
                setError(axiosError?.response?.data?.message || 'Something went wrong')
                console.log(axiosError?.response?.data);
            } else {
                setError('An error occured. Please try again');
                console.log(error);
            }
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6">Add New Entry</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring focus:ring-opacity-50"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700">Content</label>
                        <textarea
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring focus:ring-opacity-50"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Date</label>
                        <input
                            type="date"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring focus:ring-opacity-50"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                        Add Entry
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEntry;