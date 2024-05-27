import React from "react";
import "../App.css";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const notifySuccessSignup = () => toast("Sign up successful!");
  const notifyFailSignup = () => toast("User was not created");

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newEmail,
          username: newUsername,
          password: newPassword,
        }),
      });
      if (!res.ok) {
        notifyFailSignup();
        throw new Error("Failed to add new user");
      } else {
        notifySuccessSignup();
        navigate("/");
      }
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  return (
    <>
      <div className="main">
        <div className="forms">
          <Toaster />

          <h1>Sign up</h1>
          <form id="signUpForm" onSubmit={signUp} className="forms">
            <label>Email</label>

            <input
              id="newEmail"
              type="email"
              name="newEmail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />

            <label>Username</label>

            <input
              id="newUsername"
              type="text"
              name="newUsername"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />

            <label>Password</label>

            <input
              id="newPassword"
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button type="submit">Sign up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
