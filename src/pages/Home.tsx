import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate('/login');
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <header className="w-full py-6 bg-blue-600 text-white text-center text-2xl font-bold">
                Personal Journaling App
            </header>
            <main className="flex flex-col items-center justify-center flex-1 w-full p-4 text-center">
                <h1 className="text-3xl font-bold mb-4">Welcome to your journal</h1>
                <p className="mb-8 text-lg text-gray-700">
                    Keep track of your thoughts and experiences. Create journal entries,
                    categorize them, and view a summary of your entries.
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                    <button className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none" onClick={handleGetStarted}>
                        Get Started
                    </button>
                    <button className="px-6 py-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white focus:outline-none">
                        Learn More
                    </button>
                </div>
            </main>
            <footer className="w-full py-4 bg-gray-200 text-center text-gray-600">
                &copy; {new Date().getFullYear()} Personal Journaling App. All rights
                reserved.
            </footer>
        </div>
    );
};

export default Home;
