import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../utils/redux/user/userSlice";
import { LOGO } from "../utils/constant";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            user: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
        navigate("/");
      } else {
        dispatch(logout());
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="absolute bg-gradient-to-b from-black w-full z-50 flex justify-between">
      <img
        src={LOGO}
        alt="logo"
        className={`w-44 ${user ? "ml-14" : "ml-28"} mt-4`}
      />
      {user && (
        <button
          className="bg-red-600 px-6 py-1 mr-6 my-6 rounded text-white font-medium tracking-wide hover:bg-red-700"
          onClick={handleLogout}
        >
          Sign out
        </button>
      )}
    </div>
  );
}

export default Header;
