export default function Home() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-10 relative 
                 bg-gradient-to-br from-indigo-500 via-purple-600 to-fuchsia-500
                 overflow-hidden"
    >
      {/* Decorative blurred shapes */}
      <div className="absolute w-80 h-80 bg-white/20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-2xl bottom-10 right-10"></div>
      
      {/* HERO CARD */}
      <div
        className="relative z-10 max-w-2xl text-center p-12
                   bg-white/20 backdrop-blur-2xl border border-white/30
                   rounded-3xl shadow-2xl animate-fadeIn"
      >
        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg tracking-wide">
          Welcome to BidWise
        </h1>

        <p className="mt-6 text-xl text-white/90 font-light leading-relaxed">
          Connect. Bid. Choose.  
          <br />
          <span className="font-medium">The smartest way to hire services.</span>
        </p>

        {/* Decorative small divider */}
        <div className="mt-8 w-24 h-1 bg-white/50 mx-auto rounded-full"></div>

        {/* Call to action buttons */}
        <div className="mt-10 flex justify-center gap-6">
          <a
            href="/services"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 
                       text-white font-semibold rounded-xl shadow-lg
                       transition-transform transform hover:-translate-y-1"
          >
            Explore Services
          </a>

          <a
            href="/post-request"
            className="px-6 py-3 bg-white/30 text-white font-semibold
                       border border-white/40 rounded-xl backdrop-blur-lg
                       hover:bg-white/40 shadow-lg transition-transform 
                       transform hover:-translate-y-1"
          >
            Post a Request
          </a>
        </div>
      </div>

      {/* Fade-in animation */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
