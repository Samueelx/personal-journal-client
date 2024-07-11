import React from "react";
import ChipProps from "../types/ChipProps";

const Chip: React.FC<ChipProps> =({label, onClick, isSelected}) => {
    return (
        <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-medium 
            ${isSelected ? 'bg-blue-500 text-white': 'bg-gray-200 text-gray-700'}`}
        >{label}</button>
    );
};

export default Chip;