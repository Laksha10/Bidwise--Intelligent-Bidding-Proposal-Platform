import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
        <div className="bg-white/20 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-white/30 text-center w-96">
          <p className="text-white text-lg mb-4">You are not logged in.</p>

          <Link
            to="/login"
            className="block bg-white/70 text-indigo-700 font-semibold py-2 rounded-xl shadow hover:bg-white transition"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-600 p-6">

      {/* GLASS CARD */}
      <div className="bg-white/20 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/30 w-full max-w-md animate-fadeIn">

        {/* HEADER */}
        <h2 className="text-3xl font-extrabold text-center text-white drop-shadow mb-8">
          Profile
        </h2>

        {/* PROFILE DETAILS */}
        <div className="space-y-3 text-white">
          <p>
            <span className="font-semibold text-indigo-200">Name:</span>{" "}
            {user.name}
          </p>

          <p>
            <span className="font-semibold text-indigo-200">Email:</span>{" "}
            {user.email}
          </p>

          <p>
            <span className="font-semibold text-indigo-200">Role:</span>{" "}
            <span className="capitalize">{user.role}</span>
          </p>
        </div>

        {/* DASHBOARD BUTTON */}
        {/* DASHBOARD BUTTON */}
<div className="mt-8">
  {user.role === "seeker" ? (
    <Link
      to="/seeker-dashboard"
      className="block w-full text-center text-white py-3 rounded-xl font-semibold 
                 shadow-xl hover:shadow-2xl transition
                 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
    >
      Go to Seeker Dashboard
    </Link>
  ) : (
    <Link
      to="/company-dashboard"
      className="block w-full text-center text-white py-3 rounded-xl font-semibold 
                 shadow-xl hover:shadow-2xl transition
                 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
    >
      Go to Company Dashboard
    </Link>
  )}
</div>


        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="mt-5 w-full bg-red-500 text-white py-3 rounded-xl font-semibold shadow-xl hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* FADE-IN ANIMATION */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn .7s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
