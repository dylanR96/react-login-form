import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);

  const notifySuccessUsers = () => toast("Users retrieved");
  const notifyFailUsers = () => toast("Unable to retrieve users!");

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
        <Outlet />
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
