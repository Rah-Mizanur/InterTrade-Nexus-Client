import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    try {
      setLoading(true);
      await logOutUser();
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error(err.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  // Logged out state
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/login" className="btn btn-ghost">
          Login
        </Link>
        <Link to="/register" className="btn btn-accent">
          Register
        </Link>
      </div>
    );
  }

  // Logged in state
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full ring ring-accent ring-offset-2 ring-offset-base-100">
          <img
            src={user.photoURL || "/avatar-placeholder.png"}
            alt={user.displayName || "User Avatar"}
          />
        </div>
      </label>

      <ul
        tabIndex={0}
        className="menu dropdown-content mt-3 w-52 rounded-xl bg-base-100 p-2 shadow"
      >
        <li className="px-3 py-2 text-sm text-base-content/70 cursor-default">
          {user.displayName || "User"}
        </li>

        {/* <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/profile">Profile</Link>
        </li> */}

        <li className="mt-1 border-t">
          <button
            onClick={handleLogOut}
            disabled={loading}
            className="text-error"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
