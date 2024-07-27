import React from "react";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Body />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
