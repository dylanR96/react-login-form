import "./App.css";
import { useState } from "react";
function App() {
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [existingEmail, setExistingEmail] = useState("");
  const [existingUsername, setExistingUsername] = useState("");
  const [existingPassword, setExistingPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:8000/api/users/login/${existingUsername}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("User does not exist");
      } else {
        console.log("success!");
      }
    } catch (error) {
      console.error("Error finding user");
    }
  };

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
        throw new Error("Failed to add new user");
      } else {
        console.log("success!");
      }
    } catch (error) {
      console.error("Error adding user");
    }
  };

  return (
    <>
      <div className="main">
        <div className="forms">
          <h1>Login</h1>
          <form id="loginForm" onSubmit={login} className="forms">
            <label for="email">Email</label>

            <input
              id="email"
              type="text"
              name="email"
              value={existingEmail}
              onChange={(e) => setExistingEmail(e.target.value)}
            />

            <label for="username">Username</label>

            <input
              id="username"
              type="text"
              name="username"
              value={existingUsername}
              onChange={(e) => setExistingUsername(e.target.value)}
            />

            <label for="password">Password</label>

            <input
              id="password"
              type="text"
              name="password"
              value={existingPassword}
              onChange={(e) => setExistingPassword(e.target.value)}
            />

            <button type="submit">Login</button>
          </form>
          <h1>Sign up</h1>
          <form id="signUpForm" onSubmit={signUp} className="forms">
            <label for="newEmail">Email</label>

            <input
              id="newEmail"
              type="text"
              name="newEmail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />

            <label for="newUsername">Username</label>

            <input
              id="newUsername"
              type="text"
              name="newUsername"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />

            <label for="newPassword">Password</label>

            <input
              id="newPassword"
              type="text"
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
}

export default App;
