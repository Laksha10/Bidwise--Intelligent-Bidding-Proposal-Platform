import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PostService from "../pages/PostService";
import Bids from "../pages/Bids";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Navbar from "../components/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import SeekerDashboard from "../pages/seeker/SeekerDashboard";
import CompanyDashboard from "../pages/company/CompanyDashboard";
import AiTestPage from '../pages/aitestpage'; 

// 1. Import your new notifications component
import Notifications from "../components/notifications"; 

function AppRouter() {
  return (
    <Router>
      <Navbar />
      
      {/* 2. Add Notifications here so it works on EVERY page */}
      <Notifications />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-service" element={<PostService />} />
        <Route path="/post-request" element={<PostService />} />
        <Route path="/bids" element={<Bids />} />
        
        <Route path="/ai-test" element={<AiTestPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowed={["company", "seeker"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/seeker-dashboard"
          element={
            <ProtectedRoute allowed={["seeker"]}>
              <SeekerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/company-dashboard"
          element={
            <ProtectedRoute allowed={["company"]}>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;