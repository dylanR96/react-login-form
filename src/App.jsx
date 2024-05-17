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
        `http://localhost:8000/api/users/${existingUsername}`,
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
      const res = await fetch("http://localhost:8000/api/users/", {
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
      <div>
        <h1>Login</h1>
        <form id="loginForm" onSubmit={login}>
          <label for="email">Email</label>
          <br />
          <input
            id="email"
            type="text"
            name="email"
            value={existingEmail}
            onChange={(e) => setExistingEmail(e.target.value)}
          />
          <br />
          <label for="username">Username</label>
          <br />
          <input
            id="username"
            type="text"
            name="username"
            value={existingUsername}
            onChange={(e) => setExistingUsername(e.target.value)}
          />
          <br />
          <label for="password">Password</label>
          <br />
          <input
            id="password"
            type="text"
            name="password"
            value={existingPassword}
            onChange={(e) => setExistingPassword(e.target.value)}
          />
          <br />
          <button type="submit">Login</button>
        </form>
        <h1>Sign up</h1>
        <form id="signUpForm" onSubmit={signUp}>
          <label for="newEmail">Email</label>
          <br />
          <input
            id="newEmail"
            type="text"
            name="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <br />
          <label for="newUsername">Username</label>
          <br />
          <input
            id="newUsername"
            type="text"
            name="newUsername"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <br />
          <label for="newPassword">Password</label>
          <br />
          <input
            id="newPassword"
            type="text"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <button type="submit">Sign up</button>
        </form>
      </div>
    </>
  );
}

export default App;
