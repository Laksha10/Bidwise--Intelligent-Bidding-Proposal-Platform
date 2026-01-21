import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    // Simulated login - replace with your actual authentication logic
    if (formData.email && formData.password) {
      console.log("Login attempt:", formData);
      alert("Login successful! (This is a demo)");
      // In your actual app, this would call your API and handle authentication
    } else {
      setError("Please enter both email and password");
    }
  };

  const handleSignUpClick = () => {
    console.log("Navigating to Sign Up page");
    alert("This would navigate to the Sign Up page in your actual app");
    // In your actual app: navigate("/register")
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">Login</h2>
        
        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}
        
        <div className="space-y-4 mb-6">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;