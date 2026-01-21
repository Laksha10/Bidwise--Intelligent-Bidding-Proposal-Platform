import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RankedBids from "../components/rankedbids";

const AiTestPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const testJobId = "696fae0ebc1cdae70daefe80"; 

  const handleBack = () => {
    if (user?.role === "company") {
      navigate("/company-dashboard");
    } else {
      navigate("/seeker-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-8 pb-20">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Header */}
        <div className="flex justify-start mb-8">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-white bg-white/20 hover:bg-white/30 px-5 py-2 rounded-xl transition-all font-semibold backdrop-blur-sm border border-white/30"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* AI Component */}
        <div className="pt-2">
          <RankedBids serviceId={testJobId} />
        </div>
      </div>
    </div>
  );
};

export default AiTestPage;