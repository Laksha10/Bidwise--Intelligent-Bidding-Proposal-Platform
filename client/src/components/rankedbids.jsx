import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext"; // 👈 Import your Auth Hook

const RankedBids = ({ serviceId }) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth(); // 👈 Destructure the token from context

  useEffect(() => {
    const fetchRankedBids = async () => {
      try {
        // Only attempt fetch if we have a token
        if (!token) {
          console.warn("No auth token found, waiting for login...");
          return;
        }

        const res = await axios.get(
          `http://localhost:5050/api/bids/service/${serviceId}/ai-ranked`, 
          {
            headers: {
              Authorization: `Bearer ${token}` // 👈 Pass the JWT in the header
            }
          }
        );
        setBids(res.data);
      } catch (err) {
        console.error("Error fetching AI rankings:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) fetchRankedBids();
  }, [serviceId, token]); // 👈 Add token as a dependency

  if (loading) return (
    <div className="flex justify-center items-center p-10 text-white font-semibold animate-pulse">
      🤖 AI is calculating best matches...
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-extrabold text-white mb-2 drop-shadow-md">
        Smart Ranked Bids
      </h2>
      
      {bids.length === 0 ? (
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl text-white">
          No bids found for this service yet.
        </div>
      ) : (
        bids.map((bid, index) => (
          <div 
            key={bid.id} 
            className="bg-white p-6 rounded-2xl shadow-lg w-full transition-all hover:scale-[1.01] border-l-8"
            style={{ borderLeftColor: index === 0 ? '#4f46e5' : bid.is_suspicious ? '#ef4444' : '#e5e7eb' }}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-gray-800">
                    Bidder #{bid.id ? bid.id.slice(-4) : "N/A"}
                  </span>
                  {index === 0 && (
                    <span className="bg-indigo-100 text-indigo-600 text-xs px-3 py-1 rounded-full font-bold tracking-wide uppercase">
                      ⭐ Best Match
                    </span>
                  )}
                </div>
                <p className="text-gray-600 italic text-sm leading-relaxed">
                  "{bid.analysis || 'AI is currently analyzing this bid description...'}"
                </p>
              </div>

              <div className="text-right bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                <div className="text-3xl font-black text-indigo-600">
                  {Math.round(bid.score * 100)}%
                </div>
                <div className="text-[10px] uppercase font-bold text-indigo-400">Match Score</div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
              <div className="flex gap-3">
                <span className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                  bid.is_suspicious 
                    ? 'bg-red-50 text-red-600 border border-red-100' 
                    : 'bg-green-50 text-green-700 border border-green-100'
                }`}>
                  {bid.price_note || "Standard Pricing"}
                </span>
                <span className="bg-purple-50 text-purple-600 px-4 py-1.5 rounded-lg text-xs font-bold border border-purple-100">
                  AI Semantic: {Math.round(bid.semantic_score * 100)}%
                </span>
              </div>
              
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
                Select Bid
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RankedBids;