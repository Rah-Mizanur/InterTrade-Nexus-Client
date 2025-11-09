import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const { user, logOutUser } = use(AuthContext);
  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast("LogOut Successful");
      })
      .catch((err) => {
        const errorMessage = err.message;
        toast(errorMessage);
      });
  };
  return (
    <>
      {user ? (
        <div className=" flex gap-2">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={user?.photoURL || "https://photo/user"}
            />
          </div>
          <div>
            <button className="btn btn-accent" onClick={handleLogOut}>
              LogOut
            </button>
          </div>

          <ToastContainer></ToastContainer>
        </div>
      ) : (
        <div className="navbar-end gap-2">
          <Link to="/login" className="btn btn-secondary">
            LogIn
          </Link>
          <Link to="/register" className="btn btn-accent">
            Register
          </Link>
        </div>
      )}
    </>
  );
};

export default Profile;
