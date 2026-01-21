import React, { useEffect, useState } from "react";
import API from "../../utils/api";

export default function CompanyDashboard() {
  const [services, setServices] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchServices();
    fetchNotifications();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await API.get("/services");
      setServices(res.data);
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

      {/* HEADER CARD */}
      <div className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/30 mb-10">
        <h1 className="text-4xl font-extrabold text-white drop-shadow">
          Company Dashboard
        </h1>
        <p className="text-white/80 text-lg mt-2">
          View open service requests and manage your bids.
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* OPEN SERVICES SECTION */}
        <div className="lg:col-span-2 bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30">

          <h2 className="text-2xl font-bold text-white mb-6">
            Open Services
          </h2>

          {services.length === 0 && (
            <p className="text-white/70 italic">No open services right now.</p>
          )}

          {services.map((s) => (
            <div
              key={s._id}
              className="p-5 mb-4 bg-white/60 border border-white/40 rounded-2xl shadow hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-indigo-700">{s.title}</h3>

              <p className="text-gray-700 mt-1">
                <span className="font-medium">Budget:</span> ₹{s.budget}
              </p>

              <p className="text-gray-600 text-sm">
                Requested by: {s.seeker?.name || "Unknown"}
              </p>
            </div>
          ))}

          <div className="mt-6">
            <a
              href="/bids"
              className="text-white font-semibold underline hover:text-indigo-200 transition"
            >
              → Go to Bids page to view details & submit bids
            </a>
          </div>
        </div>

        {/* NOTIFICATIONS SECTION */}
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30">

          <h2 className="text-2xl font-bold text-white mb-6">
            Notifications
          </h2>

          {notifications.length === 0 && (
            <p className="text-white/70 italic">No notifications.</p>
          )}

          {notifications.map((n) => (
            <div
              key={n._id}
              className={`p-4 mb-3 rounded-2xl shadow 
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
