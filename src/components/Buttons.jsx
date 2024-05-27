import React from "react";
import { useNavigate } from "react-router-dom";

const Buttons = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/signUp")}>Sign up</button>
    </>
  );
};

export default Buttons;
