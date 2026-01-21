import React, { useState } from "react";
import API from "../utils/api";

export default function PostRequestForm({ onPosted }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        description,
        budget: budget ? Number(budget) : undefined,
        deadline: deadline || undefined,
      };
      const res = await API.post("/services", payload);
      alert("Service posted");

      setTitle("");
      setDescription("");
      setBudget("");
      setDeadline("");

      if (onPosted) onPosted(res.data.service);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error posting service");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-r from-indigo-500 to-purple-600 p-10">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/25 backdrop-blur-2xl 
                  p-12 rounded-3xl shadow-2xl border border-white/30 animate-fadeIn"
      >
        {/* FORM TITLE */}
        <h2 className="text-center text-3xl font-bold text-white drop-shadow-md mb-10">
          Post a Service Request
        </h2>

        {/* TITLE INPUT */}
        <div className="relative mb-7">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="peer w-full p-4 pt-6 text-lg border border-gray-300 
                       bg-white/60 rounded-2xl focus:ring-2 
                       focus:ring-indigo-400 outline-none shadow-lg"
          />
          <label className="absolute left-4 top-1 text-gray-600 text-sm 
                            peer-focus:text-indigo-700 transition-all">
            Title
          </label>
        </div>

        {/* DESCRIPTION */}
        <div className="relative mb-7">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="peer w-full p-4 pt-6 text-lg border border-gray-300 
                       bg-white/60 rounded-2xl focus:ring-2 
                       focus:ring-indigo-400 outline-none shadow-lg"
          />
          <label className="absolute left-4 top-1 text-gray-600 text-sm 
                            peer-focus:text-indigo-700 transition-all">
            Description
          </label>
        </div>

        {/* BUDGET */}
        <div className="relative mb-7">
          <input
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            type="number"
            className="peer w-full p-4 pt-6 text-lg border border-gray-300 
                       bg-white/60 rounded-2xl focus:ring-2 
                       focus:ring-indigo-400 outline-none shadow-lg"
          />
          <label className="absolute left-4 top-1 text-gray-600 text-sm 
                            peer-focus:text-indigo-700 transition-all">
            Budget (₹)
          </label>
        </div>

        {/* DEADLINE */}
        <div className="relative mb-10">
          <input
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            type="date"
            className="peer w-full p-4 pt-6 text-lg border border-gray-300 
                       bg-white/60 rounded-2xl focus:ring-2 
                       focus:ring-indigo-400 outline-none shadow-lg"
          />
          <label className="absolute left-4 top-1 text-gray-600 text-sm 
                            peer-focus:text-indigo-700 transition-all">
            Deadline
          </label>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          className="w-full bg-indigo-600 text-white py-4 text-lg 
                     rounded-2xl font-semibold shadow-xl hover:bg-indigo-700 
                     hover:shadow-2xl transition-all duration-300 transform 
                     hover:-translate-y-1"
        >
          Post Request
        </button>
      </form>

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
