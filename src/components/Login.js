import React from "react";
import Header from "./Header";
import { useState} from "react";



const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
      // Handle sign in logic here
      console.log("Signing in with:", { email, password });
    } else {
      // Handle sign up logic here
      console.log("Signing up with:", { firstName, lastName, email, password });
    }
  };

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    // Clear form when switching
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setRememberMe(false);
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
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-4 bg-gray-700 text-white placeholder-gray-400 rounded border border-gray-600 focus:bg-gray-600 focus:border-white focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-4 bg-gray-700 text-white placeholder-gray-400 rounded border border-gray-600 focus:bg-gray-600 focus:border-white focus:outline-none"
                />
              </>
            )}

            <input
              type="text"
              placeholder="Email or mobile number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-700 text-white placeholder-gray-400 rounded border border-gray-600 focus:bg-gray-600 focus:border-white focus:outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-700 text-white placeholder-gray-400 rounded border border-gray-600 focus:bg-gray-600 focus:border-white focus:outline-none"
            />

            {/* Confirm Password for Sign Up */}
            {!isSignIn && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-4 bg-gray-700 text-white placeholder-gray-400 rounded border border-gray-600 focus:bg-gray-600 focus:border-white focus:outline-none"
              />
            )}
          </div>

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
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
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