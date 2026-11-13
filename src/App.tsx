import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/authPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/" element={
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
          <h1 className="text-4xl font-serif text-[#D8B45A]">LUXERA Home</h1>
          <p className="mt-4 text-gray-400">You have successfully logged in!</p>
          <button 
            onClick={() => {
              localStorage.removeItem("ACCESS_TOKEN");
              window.location.href = "/login";
            }}
            className="mt-8 px-6 py-2 border border-white/20 rounded-lg hover:bg-white/10"
          >
            Logout
          </button>
        </div>
      } />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;