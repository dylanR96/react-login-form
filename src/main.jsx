import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login.jsx";
import LoggedIn from "./pages/LoggedIn.jsx";
import SignUp from "./pages/SignUp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
        loader: () => (document.title = "React login page || Login page"),
      },
      {
        path: "/loggedIn",
        element: <LoggedIn />,
        loader: () => (document.title = "React login page || Logged in"),
      },
      {
        path: "/signUp",
        element: <SignUp />,
        loader: () => (document.title = "React login page || Sign up"),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
