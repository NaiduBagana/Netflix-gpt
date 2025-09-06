import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged ,signOut} from "firebase/auth";
import { LOGO_URL,USER_AVATAR } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  useEffect(() => {
   const unsubscribe= onAuthStateChanged(auth, (user) => {
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
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });
    return ()=>unsubscribe();
  }, []);
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
          src={LOGO_URL}
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
                user?.photoURL || USER_AVATAR
                
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
