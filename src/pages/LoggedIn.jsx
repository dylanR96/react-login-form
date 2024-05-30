import React from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "../components/Buttons";

const LoggedIn = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>Success!</div>
      <Buttons label={"Log out"} onClick={() => navigate("/")} />
    </>
  );
};

export default LoggedIn;
