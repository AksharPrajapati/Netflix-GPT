import React, { useEffect } from "react";
import Body from "./components/Body";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "./utils/redux/user/userSlice";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            user: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(logout());
        navigate("/");
      }
    });
  }, [dispatch, navigate]);

  return <RouterProvider router={router} />;
}

export default App;
