import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { LOGO_URL, USER_AVATAR } from "../utils/constants";
import { toggleGptSearch } from "../utils/gptSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
        navigate("/error");
      });
  };

  const handleGptSearch = () => {
    dispatch(toggleGptSearch());
  };

  return (
    <div className="absolute w-full top-0 left-0 z-30 px-6 py-4 bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center justify-between">
        {/* Netflix Logo */}
        <img
          className="h-8 md:h-12 cursor-pointer"
          src={LOGO_URL}
          alt="Netflix Logo"
          onClick={() => navigate("/")}
        />

        {/* Navigation Menu - Only show if user is logged in */}
        {user && !showGptSearch &&(
          <nav className="hidden md:flex space-x-6 text-white text-sm">
            
              <a href="#" className="hover:text-gray-300 transition-colors" onClick={handleGptSearch}>
                Home
              </a>
           
            <a href="#" className="hover:text-gray-300 transition-colors">
              TV Shows
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Movies
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              New & Popular
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              My List
            </a>
          </nav>
        )}

        {/* Cool GPT Search Button */}
        {user && (
          <button
            className={`
              relative px-6 py-3 font-semibold text-white rounded-full
              ${
                showGptSearch
                  ? "bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900"
                  : "bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900"
              }
              transform hover:scale-105 transition-all duration-300 ease-out
              shadow-lg hover:shadow-xl hover:shadow-red-500/25
              border border-red-500/30
              group overflow-hidden
            `}
            onClick={handleGptSearch}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-red-500 to-red-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>

            {/* Button content */}
            <div className="relative flex items-center space-x-2">
              {/* Icon changes based on state */}
              {showGptSearch ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              )}
              <span className="text-sm font-bold tracking-wide">
                {showGptSearch ? "Home" : "GPT Search"}
              </span>
            </div>

            {/* Netflix-style glow when active */}
            {showGptSearch && (
              <div className="absolute inset-0 rounded-full border-2 border-red-400/40 animate-pulse"></div>
            )}
          </button>
        )}

        {/* Right Side - User Profile Section */}
        {user && (
          <div className="flex items-center space-x-4">
            {/* Search, Kids, Notifications */}
            <div className="hidden md:flex items-center space-x-4 text-white">
              <svg
                className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
              <span className="cursor-pointer hover:text-gray-300 transition-colors">
                KIDS
              </span>
              <svg
                className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
              </svg>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img
                  className="w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-white/50 transition-all duration-200"
                  src={user?.photoURL || USER_AVATAR}
                  alt="Profile"
                />
                <svg
                  className={`w-4 h-4 text-white transition-transform duration-200 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-md border border-gray-600 rounded-lg shadow-2xl animate-fadeIn">
                  <div className="py-1">
                    <div className="px-4 py-2 text-white text-sm border-b border-gray-600">
                      <div className="font-medium">
                        {user?.displayName || "User"}
                      </div>
                      <div className="text-gray-400 text-xs">{user?.email}</div>
                    </div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700/50 transition-colors"
                    >
                      Manage Profiles
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700/50 transition-colors"
                    >
                      Account
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700/50 transition-colors"
                    >
                      Help Centre
                    </a>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-red-600/20 transition-colors border-t border-gray-600"
                    >
                      Sign out of Netflix
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
