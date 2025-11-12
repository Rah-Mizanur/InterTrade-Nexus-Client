import React, { use, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, setUser, updateUser,signInWithGoogle } = use(AuthContext);
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordPattern.test(password)) {
      setError(
        "Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    setError("");
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate("/");
          })
          .catch((err) => {
            toast(err.message);
            setUser(user);
          });
      })
      .catch((err) => {
        const errorMessage = err.messages;
        toast(errorMessage);
      })
      .catch((error) => {
        setError(error.message);
      });
    // console.log({name, email, photo, password});
  };

  const handleGoogleLogIn=(e)=>{
     signInWithGoogle()
      .then((result) => {
          const user = result.user;
          navigate('/')
        })
        .catch((error) => {
          toast("Google login error:", error.message);
        });
    }
    const [showPassword , setShowPassword] = useState(false)

  return (
    <div className="flex items-center justify-center min-h-screen">
      <title>InterTrade || Register</title>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-300">
          Register
        </h2>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
            />
          </div>
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="https://your-photo-url.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
            <input
              name="password"
              type={ showPassword ?'text' : 'password'}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="password"
            />
            <button onClick={() => setShowPassword(!showPassword)}
             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
        tabIndex={-1} // prevent tab focus on button
            >
             {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          
            </div>
          </div>
          <div>
            <button className="flex items-center justify-center gap-3 w-full py-3 text-white font-semibold rounded-md bg-gradient-to-r from-red-400 via-green-400 to-blue-500 hover:opacity-90 transition">
              Register
            </button>
          </div>
        {error && <p className="text-red-700"> {error} </p>}
        </form>

        <div>
          
            <button onClick={handleGoogleLogIn} className="flex items-center justify-center gap-3 w-full py-3 text-white font-semibold rounded-md bg-gradient-to-r from-green-400 via-purple-400 to-pink-500 hover:opacity-90 transition">
              <div className="bg-white text-gray-800 rounded-full p-1">
                <FcGoogle className="text-2xl" />
              </div>
              <span>Login With Google</span>
            </button>
          
        </div>
      </div>
      <div>
        <ToastContainer></ToastContainer>
      </div>
    </div>
  );
};

export default Register;
