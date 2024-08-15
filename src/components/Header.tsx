import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.user.user);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="absolute bg-gradient-to-b from-black w-full z-50 flex justify-between">
      <img
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
        className="w-44 ml-28 mt-4"
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
