import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "../../service/auth";
import { AuthContext } from "../../context/authContext";
import bgImage from "../assets/luxera-auth-bg.png";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function LuxeraAuthPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", password: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (isLogin) {
        const res = await loginUser(formData.email, formData.password);
        
        login(res.data); 
        toast.success(`Welcome back, ${res.data.firstName}!`);
        
      
        if (res.data.roles && res.data.roles.includes("ADMIN")) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        await registerUser(formData);
        toast.success("Account created! Please sign in.");
        setIsLogin(true);
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col justify-between bg-[#080808] text-[#F5F1E8]"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black/70 lg:bg-black/40 pointer-events-none" />

      
      <header className="relative z-10 w-full px-6 md:px-12 py-6">
        <h2 className="font-serif text-2xl tracking-[0.3em]">LUXERA</h2>
        <p className="text-[9px] text-[#D8B45A] tracking-[0.3em] uppercase mt-1">Fine Perfumery</p>
      </header>

      
      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-[440px] bg-[#0B0B0D]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          
          <div className="text-center mb-7">
            <h2 className="font-serif text-3xl text-white">{isLogin ? "Sign In" : "Create Account"}</h2>
            <p className="text-white/50 text-sm mt-2">Welcome to LUXERA</p>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center gap-2 bg-[#080808] border border-white/10 rounded-lg px-3 h-11 focus-within:border-[#D8B45A] transition-colors">
                    <User size={16} className="text-white/35" />
                    <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} className="w-full bg-transparent outline-none text-sm text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 bg-[#080808] border border-white/10 rounded-lg px-3 h-11 focus-within:border-[#D8B45A] transition-colors">
                    <User size={16} className="text-white/35" />
                    <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} className="w-full bg-transparent outline-none text-sm text-white" />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 bg-[#080808] border border-white/10 rounded-lg px-3 h-11 focus-within:border-[#D8B45A] transition-colors">
              <Mail size={16} className="text-white/35" />
              <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} className="w-full bg-transparent outline-none text-sm text-white" />
            </div>

            <div className="flex items-center gap-3 bg-[#080808] border border-white/10 rounded-lg px-3 h-11 focus-within:border-[#D8B45A] transition-colors">
              <Lock size={16} className="text-white/35" />
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" required minLength={6} onChange={handleChange} className="w-full bg-transparent outline-none text-sm text-white" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/40 hover:text-[#D8B45A]">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button type="submit" disabled={isLoading} className="w-full h-11 mt-2 flex items-center justify-center gap-2 bg-[#D8B45A] text-black rounded-lg font-bold text-sm hover:bg-[#E8C675] transition-all disabled:opacity-50">
              {isLoading ? "PLEASE WAIT..." : isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
              {!isLoading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="text-center mt-6 text-sm">
            <span className="text-white/45">{isLogin ? "Don't have an account? " : "Already have an account? "}</span>
            <button onClick={() => setIsLogin(!isLogin)} className="text-[#D8B45A] font-medium hover:underline">
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}