import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

function App() {
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [existingEmail, setExistingEmail] = useState("");
  const [existingUsername, setExistingUsername] = useState("");
  const [existingPassword, setExistingPassword] = useState("");

  const [users, setUsers] = useState([]);

  const notifySuccessLogin = () => toast("Login successful.");
  const notifyFail = () => toast("Email or user does not exist.");
  const notifySuccessSignup = () => toast("Sign up successful!");
  const notifyFailSignup = () => toast("User was not created");

  const notifySuccessUsers = () => toast("Users retrieved");
  const notifyFailUsers = () => toast("Unable to retrieve users!");

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
      }
    } catch (error) {
      console.error("Error finding user", error);
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
        notifyFailSignup();
        throw new Error("Failed to add new user");
      } else {
        notifySuccessSignup();
      }
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  const getUsers = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        notifyFailUsers();
        throw new Error("Failed to retrieve users");
      }
      const data = await res.json();
      setUsers(data);
      notifySuccessUsers();
    } catch (error) {
      console.error("Error adding users", error);
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
        <div>
          <button onClick={getUsers}>Get users</button>
          <div>
            <h2>Users</h2>
            <ul>
              {users.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
