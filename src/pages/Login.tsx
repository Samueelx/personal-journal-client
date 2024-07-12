import React, { useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { ErrorResponse } from "../types/ErrorResponse";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      /**store token in localstorage */
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response && axiosError.response.data) {
        setError(
          axiosError.response?.data?.message ||
            "An error occured. Please try again"
        );
      } else {
        setError("An error occured. Please try again");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Login
          </button>
          <div className="flex justify-center">
            {loading ? (
              <span className="loading loading-ring loading-lg"></span>
            ) : (
              <></>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
