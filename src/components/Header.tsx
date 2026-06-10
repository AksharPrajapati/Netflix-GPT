import React, { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../utils/redux/user/userSlice";
import { LOGO } from "../utils/constant";

const NAV_LINKS = ["Home", "TV Shows", "Movies", "New & Popular", "My List"];

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = useSelector((state: any) => state.user.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          login({
            user: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    signOut(auth).catch(console.error);
    setDropdownOpen(false);
  };

  const avatarLetter =
    user?.displayName?.[0]?.toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "U";

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-14 py-4 bg-gradient-to-b from-black/95 via-black/40 to-transparent">
      {/* Logo */}
      <div className="flex items-center gap-10">
        <img src={LOGO} alt="Netflix" className="w-32" />

        {/* Nav links — hide on smaller screens */}
        {user && (
          <nav className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <span
                key={link}
                className="text-sm text-gray-200 hover:text-white cursor-pointer transition-colors duration-150 font-medium"
              >
                {link}
              </span>
            ))}
          </nav>
        )}
      </div>

      {/* Right side */}
      {user && (
        <div className="flex items-center gap-5" ref={dropdownRef}>
          {/* Profile avatar */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-1.5 group"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="avatar"
                  className="w-8 h-8 rounded object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white font-bold text-sm select-none">
                  {avatarLetter}
                </div>
              )}
              <svg
                className={`w-3 h-3 text-white transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                viewBox="0 0 10 6"
                fill="currentColor"
              >
                <path d="M0 0l5 6 5-6z" />
              </svg>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-12 w-52 bg-black/95 border border-gray-700 rounded shadow-2xl py-2 z-50">
                {/* User info */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-700">
                  <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {avatarLetter}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-white text-sm font-semibold truncate">
                      {displayName}
                    </p>
                    <p className="text-gray-400 text-xs truncate">{user.email}</p>
                  </div>
                </div>

                {/* Manage Profiles */}
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white text-sm transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  Manage Profiles
                </button>

                {/* Account Settings */}
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white text-sm transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Account Settings
                </button>

                <div className="border-t border-gray-700 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Sign out of Netflix
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
