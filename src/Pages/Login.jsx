import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import InterTradeLogo from "../assets/logo.png"; // import your logo here

const Login = () => {
  const { signInUser, signInWithGoogle } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogIn = async () => {
    try {
      const result = await signInWithGoogle();
      navigate(location.state || "/");
      toast.success("Google login successful!");
    } catch (err) {
      console.log(err);
      toast.error("Google login error: " + err.message);
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      const result = await signInUser(email, password);
      navigate(location.state || "/");
      toast.success("Login successful!");
    } catch (err) {
      console.log(err);
      setError("Email & password not found");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <title>Login || InterTrade</title>

      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          {/* <img src={InterTradeLogo} alt="InterTrade Logo" className="w-24 h-24" /> */}
        </div>

        <h2 className="text-2xl font-bold text-center text-accent">
          Welcome Back
        </h2>

        {/* Login Form */}
        <form onSubmit={handleLogIn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Password"
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-200"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 text-center">{error}</p>}

          <div className="text-right text-sm">
            <Link to="/forgot-password" className="text-accent hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white font-semibold rounded-md bg-gradient-to-r from-green-400 via-accent to-blue-500 hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Register link */}
        <p className="text-sm text-center text-gray-700 dark:text-gray-200">
          Don't have an account?{" "}
          <Link to="/register" className="text-accent font-medium hover:underline">
            Register
          </Link>
        </p>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogIn}
          className="flex items-center justify-center gap-3 w-full py-3 text-white font-semibold rounded-md bg-gradient-to-r from-green-400 via-purple-400 to-pink-500 hover:opacity-90 transition"
        >
          <div className="bg-white text-gray-800 rounded-full p-1">
            <FcGoogle className="text-2xl" />
          </div>
          <span>Login With Google</span>
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
