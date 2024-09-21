import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleclick = () => {
    navigate("/table");
  };

  return (
    <div className="fw-bolder fs-5 align-items-center">
      Dashboard
      <div className="fw-normal">
        <button onClick={handleclick}>Click for Table</button>
      </div>
    </div>
  );
}
