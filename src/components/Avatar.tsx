import React from "react";
import { useNavigate } from "react-router-dom";

const Avatar: React.FC = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/profile')
    }
  return (
    <div className="avatar placeholder hover:cursor-pointer" onClick={handleClick}>
      <div className="bg-neutral text-neutral-content w-12 rounded-full">
        <span>SY</span>
      </div>
    </div>
  );
};

export default Avatar;