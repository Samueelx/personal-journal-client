import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile";
import { MdOutlineEditNote } from "react-icons/md";

const UpdateUser: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
    }
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.put("/users/profile", {
        username,
        password,
      });
      /**Update the user details in local storage */
      localStorage.setItem("user", JSON.stringify(response.data));
      setLoading(false);
      setEdit(false);
      navigate("/dashboard");
    } catch (error) {
        setLoading(false);
      console.log("Update Error: ", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Update Profile</h1>
      <div className="flex justify-center p-4">
        <Profile />
      </div>
      {edit ? (
        <>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username!}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              value={password!}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {" "}
              Update{" "}
            </button>
          </div>
          <div className="flex justify-center">
            {loading ? (
              <span className="loading loading-ring loading-lg"></span>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center gap-2">
          <p className="text-3xl text-center font-bold">{username}</p>
          <MdOutlineEditNote
            size={32}
            className="ml-4 hover:cursor-pointer hover:shadow-lg"
            onClick={() => setEdit(true)}
          />
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
