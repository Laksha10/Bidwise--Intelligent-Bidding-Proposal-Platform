import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import PostRequestForm from "../../components/PostRequestForm";

export default function SeekerDashboard() {
  const [myServices, setMyServices] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchMyServices();
    fetchNotifications();
  }, []);

  const fetchMyServices = async () => {
    try {
      const res = await API.get("/services/my");
      setMyServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-r from-indigo-500 to-purple-600">

      {/* HEADER */}
      <div className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/30 mb-10">
        <h1 className="text-4xl font-extrabold text-white drop-shadow">
          Service Seeker Dashboard
        </h1>
        <p className="text-white/80 text-lg mt-2">
          Post new service requests and track company bids.
        </p>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT: POST REQUEST + LIST */}
        <div className="lg:col-span-2 space-y-10">

          {/* POST REQUEST FORM */}
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/30">
            <PostRequestForm onPosted={fetchMyServices} />
          </div>

          {/* YOUR REQUESTS */}
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30">
            <h2 className="text-2xl font-bold text-white mb-6">
              Your Service Requests
            </h2>

            {myServices.length === 0 && (
              <p className="text-white/70 italic">You haven't posted any requests yet.</p>
            )}

            {myServices.map((s) => (
              <div
                key={s._id}
                className="bg-white/60 border border-white/40 rounded-2xl p-5 mb-4 shadow hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold text-indigo-700">{s.title}</h3>

                <p className="text-gray-700 mt-1 capitalize">
                  Status: <span className="font-medium">{s.status}</span>
                </p>

                <p className="text-gray-600">
                  Budget: ₹{s.budget}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: NOTIFICATIONS */}
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30">

          <h2 className="text-2xl font-bold text-white mb-6">Notifications</h2>

          {notifications.length === 0 && (
            <p className="text-white/70 italic">No notifications yet.</p>
          )}

          {notifications.map((n) => (
            <div
              key={n._id}
              className={`p-4 mb-3 rounded-2xl shadow transition 
                ${n.read ? "bg-white/40" : "bg-yellow-200/70"}`}
            >
              <p className="text-gray-800">{n.message}</p>
              <p className="text-gray-600 text-xs mt-1">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
