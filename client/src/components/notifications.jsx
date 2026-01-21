import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

// Connect to your Node server port
const socket = io("http://localhost:5050");

const Notifications = () => {
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for the signal from your bidRoutes.js
    socket.on("new_bid_notification", (data) => {
      console.log("Real-time notification received:", data);
      setMsg(data);
      
      // Auto-hide after 10 seconds
      setTimeout(() => setMsg(null), 10000);
    });

    return () => socket.off("new_bid_notification");
  }, []);

  if (!msg) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] animate-pulse">
      <div className="bg-white p-5 rounded-2xl shadow-2xl border-l-4 border-indigo-600 w-80">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-bold text-indigo-600">🚀 New Bid Received!</h4>
          <button onClick={() => setMsg(null)} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <p className="text-sm text-gray-600 mb-4">{msg.message}</p>
        <button 
          onClick={() => {
            navigate("/ai-test"); // Redirect to your AI Ranking page
            setMsg(null);
          }}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-xl text-sm font-bold shadow-md hover:scale-105 transition-all"
        >
          View AI Analysis
        </button>
      </div>
    </div>
  );
};

export default Notifications;