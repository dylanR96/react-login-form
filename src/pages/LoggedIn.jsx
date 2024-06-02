import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "../components/Buttons";

const LoggedIn = () => {
  const navigate = useNavigate();
  const [removeUsername, setRemoveUsername] = useState("");

  const notifySuccessLogin = () => toast("Login successful.");
  const notifyFail = () => toast("Email or user does not exist.");

  const deleteUser = async (e, user) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:8000/api/users/deleteUser/${user}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: removeUsername,
          }),
        }
      );
      if (!res.ok) {
        notifyFail();
        throw new Error("Unable to delete user");
      } else {
        notifySuccessLogin();
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
          <h1>Delete user</h1>
          <form id="deleteUser" onSubmit={deleteUser} className="forms">
            <label>Username</label>

            <input
              id="text"
              type="text"
              name="text"
              value={removeUsername}
              onChange={(e) => setRemoveUsername(e.target.value)}
            />
            <button type="submit">Remove user</button>
          </form>
        </div>
        <Buttons label={"Log out"} onClick={() => navigate("/")} />
      </div>
    </>
  );
};

export default LoggedIn;
