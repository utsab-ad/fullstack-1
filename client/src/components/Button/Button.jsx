import React from "react";
import { useNavigate } from "react-router-dom";
import "./Button.css";

function Button() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");  // Navigate to the homepage
  };

  return (
    <button className="sticky-btn" onClick={goToHome}>
      Go to Home
    </button>
  );
}

export default Button;
