import React from "react";
import { useNavigate } from "react-router-dom";

const Avatar: React.FC = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/profile')
    }
  return (
    <div className="avatar placeholder">
      <div className="bg-neutral text-neutral-content w-12 rounded-full hover:cursor-pointer hover:ring hover:ring-blue-500" onClick={handleClick}>
        <span>SY</span>
      </div>
    </div>
  );
};

export default Avatar;