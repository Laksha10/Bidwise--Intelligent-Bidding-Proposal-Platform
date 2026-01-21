import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Bids() {
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [bids, setBids] = useState([]);
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await API.get("/services");
      setServices(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching services");
    }
  };

  const openService = async (s) => {
    setSelected(s);
    try {
      const res = await API.get(`/bids/service/${s._id}`);
      setBids(res.data);
    } catch (err) {
      console.error(err);
      setBids([]);
    }
  };

  const submitBid = async () => {
    if (!amount) return alert("Enter amount");
    try {
      await API.post(`/bids/${selected._id}`, {
        amount: Number(amount),
        details,
      });
      alert("Bid submitted");
      setAmount("");
      setDetails("");
      openService(selected);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error");
    }
  };

  const acceptBid = async (bidId) => {
    try {
      await API.post(`/bids/${bidId}/accept`);
      alert("Bid accepted");
      fetchServices();
      if (selected) openService(selected);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div
      className="min-h-screen p-10 bg-gradient-to-br from-indigo-500 via-purple-600 to-fuchsia-500 text-white"
    >
      <h1 className="text-4xl font-extrabold mb-10 drop-shadow-xl tracking-wide">
        Available Services
      </h1>
  
      <div className="grid grid-cols-3 gap-8">
        
        {/* LEFT PANEL (Highlighted) */}
        <div className="bg-white/25 backdrop-blur-xl border border-white/20 
                        p-6 rounded-3xl shadow-2xl">
          <h2 className="text-xl font-semibold mb-5">All Services</h2>
  
          {services.map((s) => (
            <div
              key={s._id}
              onClick={() => openService(s)}
              className="p-5 mb-4 rounded-2xl bg-white/50 backdrop-blur-lg
                         shadow-md cursor-pointer hover:bg-white/70 
                         transition border border-white/40"
            >
              <h3 className="text-lg font-bold text-gray-900">{s.title}</h3>
              <p className="text-sm text-gray-800">
                Budget: ₹{s.budget} • {s.seeker?.name}
              </p>
            </div>
          ))}
        </div>
  
        {/* RIGHT PANEL — Placeholder Box Smaller */}
        <div className="col-span-2 flex items-start justify-center">
          {!selected ? (
            <div className="w-full max-w-3xl p-8 bg-white/30 backdrop-blur-xl 
                            border border-white/40 rounded-3xl shadow-xl 
                            text-center text-white text-lg">
              Click a service to see details & bids
            </div>
          ) : (
            <div className="w-full bg-white/20 backdrop-blur-xl border border-white/20 
                            p-8 rounded-3xl shadow-2xl">
              {/* --- Your existing selected service details remain unchanged --- */}
              <h2 className="text-2xl font-bold text-white drop-shadow">
                {selected.title}
              </h2>
              <p className="text-gray-200 mt-2">{selected.description}</p>
              <p className="mt-3 font-semibold text-white">
                Budget: ₹{selected.budget}
              </p>
  
              <hr className="my-5 border-white/40" />
  
              <h3 className="text-xl font-semibold mb-3">Bids</h3>
  
              {bids.length === 0 && (
                <p className="text-sm text-gray-200">No bids yet</p>
              )}
  
              {bids.map((b) => (
                <div
                  key={b._id}
                  className="p-4 bg-white/40 backdrop-blur-lg border border-white/30 
                             rounded-xl mb-3 shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {b.company?.name}
                      </h4>
                      <p className="text-gray-900">₹{b.amount}</p>
                      <p className="text-sm text-gray-800">{b.details}</p>
                    </div>
  
                    <div>
                      {user?.role === "seeker" && !b.accepted && (
                        <button
                          onClick={() => acceptBid(b._id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-xl 
                                     shadow hover:bg-green-700 transition"
                        >
                          Accept
                        </button>
                      )}
                      {b.accepted && (
                        <span className="text-green-300 font-semibold">
                          AWARDED
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
  
              {user?.role === "company" && (
                <div className="mt-6 p-5 bg-white/30 backdrop-blur-lg border border-white/30 
                                rounded-2xl shadow">
                  <h4 className="font-semibold text-white mb-3">
                    Submit Your Bid
                  </h4>
  
                  <div className="flex gap-3">
                    <input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Amount (₹)"
                      className="w-1/2 p-3 bg-white/70 rounded-xl border border-gray-300 
                                 shadow-md text-gray-800 focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Details"
                      className="w-1/2 p-3 bg-white/70 rounded-xl border border-gray-300 
                                 shadow-md text-gray-800 focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
  
                  <button
                    onClick={submitBid}
                    className="mt-4 bg-purple-700 text-white px-5 py-3 
                               rounded-xl font-semibold shadow-lg hover:bg-purple-800 
                               transition"
                  >
                    Place Bid
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );  
}
