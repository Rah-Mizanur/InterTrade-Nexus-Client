import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { signInUser, signInWithGoogle } = use(AuthContext);
  const location = useLocation()
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleGoogleLogIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast("Google login error:", error.message);
      });
  };
  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => {
        setError("email & password not fount");
      });
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <title> LogIn Your Account  || InterTrade</title>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md dark:bg-accent">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleLogIn} className="space-y-4 ">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>
          <div className="text-sm text-right">
            <button
              onClick={handleGoogleLogIn}
              className="text-red-400 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          <div>
            <button className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">
              Login
            </button>
          </div>
        {error && <p className="text-red-700 text-center"> {error} </p>}
        </form>
        <div>
          <h1 className="font-normal text-sm text-center">
            {" "}
            Don't Have An Account ?{" "}
            <Link to="/register" className="text-green-400">
              Register
            </Link>
          </h1>
        </div>
        <div>
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
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;
