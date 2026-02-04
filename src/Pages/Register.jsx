import React, { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, setUser, updateUser, signInWithGoogle } = use(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const photo = form.photo.value.trim();
    const password = form.password.value;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordPattern.test(password)) {
      setError(
        "Password must have at least one uppercase, one lowercase letter, and at least 6 characters."
      );
      return;
    }

    setError("");
    try {
      const result = await createUser(email, password);
      const user = result.user;
      await updateUser({ displayName: name, photoURL: photo });
      setUser({ ...user, displayName: name, photoURL: photo });
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleGoogleLogIn = async () => {
    try {
      const result = await signInWithGoogle();
      setUser(result.user);
      toast.success("Google login successful!");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Google login failed: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <title>InterTrade || Register</title>
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-accent dark:text-secondary">
          Register
        </h2>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              placeholder="https://your-photo-url.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-200"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 mt-1">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 text-white font-semibold rounded-md bg-gradient-to-r from-red-400 via-green-400 to-blue-500 hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleLogIn}
            className="flex items-center justify-center gap-3 w-full py-3 text-white font-semibold rounded-md bg-gradient-to-r from-green-400 via-purple-400 to-pink-500 hover:opacity-90 transition"
          >
            <div className="bg-white text-gray-800 rounded-full p-1">
              <FcGoogle className="text-2xl" />
            </div>
            <span>Register with Google</span>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
