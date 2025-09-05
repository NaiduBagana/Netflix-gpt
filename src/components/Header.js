import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

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

  return (
    <div className="absolute w-full top-0 left-0 z-30 px-6 py-4 bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center justify-between">
        {/* Netflix Logo */}
        <img
          className="h-8 md:h-12 cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
          onClick={() => navigate("/")}
        />

        {/* User Profile Section - Only show if user is logged in */}
        {user && (
          <div className="flex items-center space-x-4">
            <img
              className="w-8 h-8 md:w-10 md:h-10 rounded"
              alt="User Profile"
              src={
                user?.photoURL ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
            />
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
