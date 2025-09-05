import React from "react";
import { useState, useRef } from "react";
import { checkValidate } from "../utils/checkValidate";
import Header from "./Header";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  // useRef hooks for form data
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const rememberMeRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous error
    setErrorMessage("");

    // Get values from refs
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const firstName = firstNameRef.current?.value || "";
    const lastName = lastNameRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    // Validate form data
    const validationError = checkValidate(
      email,
      password,
      isSignIn,
      firstName,
      lastName,
      confirmPassword
    );

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    // If validation passes, proceed with submit
    if (isSignIn) {
      // Sign In Logic
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed in:", user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          let friendlyMessage = "Sign in failed. Please try again.";

          // Provide user-friendly error messages
          switch (errorCode) {
            case "auth/user-not-found":
              friendlyMessage = "No account found with this email.";
              break;
            case "auth/wrong-password":
              friendlyMessage = "Incorrect password.";
              break;
            case "auth/invalid-email":
              friendlyMessage = "Invalid email address.";
              break;
            case "auth/user-disabled":
              friendlyMessage = "This account has been disabled.";
              break;
            case "auth/too-many-requests":
              friendlyMessage =
                "Too many failed attempts. Please try again later.";
              break;
            default:
              friendlyMessage = error.message;
          }

          setErrorMessage(friendlyMessage);
        });
    } else {
      // Sign Up Logic
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User created:", user);

          // Update profile with display name and photo
          return updateProfile(user, {
            displayName: firstName + " " + lastName,
            photoURL:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          });
        })
        .then(() => {
          console.log("Profile updated successfully");
           const {uid,email,displayName,photoURL} = auth.currentUser;
                      dispatch(addUser({
                          uid:uid,
                          email:email,
                          displayName:displayName,
                          photoURL:photoURL,
                      }))
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          let friendlyMessage = "Sign up failed. Please try again.";

          // Provide user-friendly error messages
          switch (errorCode) {
            case "auth/email-already-in-use":
              friendlyMessage = "An account with this email already exists.";
              break;
            case "auth/invalid-email":
              friendlyMessage = "Invalid email address.";
              break;
            case "auth/operation-not-allowed":
              friendlyMessage = "Email/password accounts are not enabled.";
              break;
            case "auth/weak-password":
              friendlyMessage = "Password is too weak.";
              break;
            default:
              friendlyMessage = error.message;
          }

          setErrorMessage(friendlyMessage);
        });
    }
  };

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    setErrorMessage(""); // Clear error when switching modes

    // Clear form fields
    if (emailRef.current) emailRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
    if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
    if (firstNameRef.current) firstNameRef.current.value = "";
    if (lastNameRef.current) lastNameRef.current.value = "";
    if (rememberMeRef.current) rememberMeRef.current.checked = false;
  };

  return (
    <div className="min-h-screen relative">
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/8d617e19-3c3c-4c28-8998-c9b14dbc7200/web/IN-en-20250901-TRIFECTA-perspective_48d84d4e-9558-46b8-a0f3-8b2dc8478431_medium.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Auth Form */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-black bg-opacity-75 p-12 rounded-md">
          <h1 className="text-white text-3xl font-bold mb-8">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>

          <div className="space-y-4">
            {/* Sign Up specific fields */}
            {!isSignIn && (
              <>
                <input
                  ref={firstNameRef}
                  type="text"
                  placeholder="First Name"
                  className="w-full p-4 bg-gray-700 text-white placeholder-gray-400 rounded border border-gray-600 focus:bg-gray-600 focus:border-white focus:outline-none"
                />
                <input
                  ref={lastNameRef}
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-4 bg-gray-700 text-white placeholder-gray-400 rounded border border-gray-600 focus:bg-gray-600 focus:border-white focus:outline-none"
                />
              </>
            )}

            <input
              ref={emailRef}
              type="text"
              placeholder="Email or mobile number"
              className="w-full p-4 bg-gray-700 text-white placeholder-gray-400 rounded border border-gray-600 focus:bg-gray-600 focus:border-white focus:outline-none"
            />

            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="w-full p-4 bg-gray-700 text-white placeholder-gray-400 rounded border border-gray-600 focus:bg-gray-600 focus:border-white focus:outline-none"
            />

            {/* Confirm Password for Sign Up */}
            {!isSignIn && (
              <input
                ref={confirmPasswordRef}
                type="password"
                placeholder="Confirm Password"
                className="w-full p-4 bg-gray-700 text-white placeholder-gray-400 rounded border border-gray-600 focus:bg-gray-600 focus:border-white focus:outline-none"
              />
            )}
          </div>

          {/* Error Message - Small red text above button */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-4 mb-2">{errorMessage}</p>
          )}

          <button
            onClick={handleSubmit}
            className="w-full p-3 mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>

          {/* Sign In specific options */}
          {isSignIn && (
            <>
              <div className="text-center mt-4 text-gray-400">OR</div>

              <button className="w-full p-3 mt-4 bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors">
                Use a sign-in code
              </button>

              <div className="text-center mt-4">
                <button className="text-gray-400 hover:text-white text-sm bg-transparent border-none cursor-pointer">
                  Forgot password?
                </button>
              </div>

              <div className="flex items-center mt-6 mb-4">
                <input
                  ref={rememberMeRef}
                  type="checkbox"
                  id="remember"
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor="remember" className="text-gray-400 text-sm">
                  Remember me
                </label>
              </div>
            </>
          )}

          {/* Sign Up specific terms */}
          {!isSignIn && (
            <div className="text-xs text-gray-400 mt-4 leading-4">
              By signing up, you agree to our{" "}
              <button className="text-white hover:underline bg-transparent border-none cursor-pointer">
                Terms of Use
              </button>{" "}
              and{" "}
              <button className="text-white hover:underline bg-transparent border-none cursor-pointer">
                Privacy Policy
              </button>
              .
            </div>
          )}

          {/* Toggle between Sign In and Sign Up */}
          <div className="text-gray-400 text-sm mt-4">
            {isSignIn ? "New to Netflix? " : "Already have an account? "}
            <button
              onClick={toggleAuthMode}
              className="text-white hover:underline bg-transparent border-none cursor-pointer"
            >
              {isSignIn ? "Sign up now." : "Sign in now."}
            </button>
          </div>

          {/* reCAPTCHA notice for Sign In only */}
          {isSignIn && (
            <div className="text-xs text-gray-500 mt-4 leading-4">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.{" "}
              <button className="text-blue-500 hover:underline bg-transparent border-none cursor-pointer">
                Learn more.
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
