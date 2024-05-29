import React from "react";
import "../App.css";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "../components/Buttons";

const Login = () => {
  const navigate = useNavigate();
  const [existingEmail, setExistingEmail] = useState("");
  const [existingUsername, setExistingUsername] = useState("");
  const [existingPassword, setExistingPassword] = useState("");

  const notifySuccessLogin = () => toast("Login successful.");
  const notifyFail = () => toast("Email or user does not exist.");

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: existingEmail,
          username: existingUsername,
          password: existingPassword,
        }),
      });
      if (!res.ok) {
        notifyFail();
        throw new Error("User does not exist");
      } else {
        notifySuccessLogin();
        navigate("/loggedIn");
      }
    } catch (error) {
      console.error("Error finding user", error);
    }
  };

  return (
    <>
      <div className="main">
        <div className="forms">
          <Toaster />
          <h1>Login</h1>
          <form id="loginForm" onSubmit={login} className="forms">
            <label>Email</label>

            <input
              id="email"
              type="email"
              name="email"
              value={existingEmail}
              onChange={(e) => setExistingEmail(e.target.value)}
            />

            <label>Username</label>

            <input
              id="username"
              type="text"
              name="username"
              value={existingUsername}
              onChange={(e) => setExistingUsername(e.target.value)}
            />

            <label>Password</label>

            <input
              id="password"
              type="password"
              name="password"
              value={existingPassword}
              onChange={(e) => setExistingPassword(e.target.value)}
            />

            <button type="submit">Login</button>
          </form>
        </div>
        <Buttons onClick={() => navigate("/signUp")} label={"Sign up"} />
      </div>
    </>
  );
};

export default Login;
