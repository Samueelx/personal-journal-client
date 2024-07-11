import React, { useState, useContext } from "react";
import Chip from "../components/Chip";
import axiosInstance from "../api/axios";
import CategoryContext from "../context/CategoryContext";
import { useNavigate } from "react-router-dom";

const Categories: React.FC = () => {
    const categories = ['Life', 'School', 'Programming', 'Family', 'Hobbies', 'Work'];
    const {setCategoryId} = useContext(CategoryContext);
    const [selectedCategory, setSelectedCategories] = useState<string | null>(null);
    // const [categoryId, setCategoryId] = useState<string | null>(null)
    const navigate = useNavigate();
    const handleCategoryClick = (category: string) => {
        setSelectedCategories(category);
        setCategoryId(null);
    }
    const handleSubmit = async () => {
        if (selectedCategory) {
            try {
                const response = await axiosInstance.post('/categories', { name: selectedCategory });
                setCategoryId(response.data.id);
                console.log("Category created with ID: ", response.data.id);
                navigate('/add-entry');
                
            } catch (error) {
                console.error('Error creating category: ', error);
            }
        }
    };
    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Choose a category</h1>
            <div className="flex flex-wrap gap-2">
                {categories.map(category => {
                    return <Chip key={category} label={category}
                        onClick={() => handleCategoryClick(category)}
                        isSelected={selectedCategory === category} />
                })}
            </div>
            <div className="flex items-center justify-center">
                <button onClick={handleSubmit}
                    className="px-4 py-2 my-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Submit
                </button>
            </div>

        </div>
    );
}

export default Categories;