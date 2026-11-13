import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "../service/auth";
import bgImage from "../assets/luxera-auth-bg.png";

import {
  Mail,
  Lock,
  User,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function LuxeraAuthPage() {
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [forgotMessage, setForgotMessage] = useState<string>("");
  const [authenticatedUser, setAuthenticatedUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
    setForgotMessage("");
  };

  const switchMode = (login: boolean) => {
    setIsLogin(login);
    setErrorMessage("");
    setForgotMessage("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMessage("");
    setForgotMessage("");
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setErrorMessage("Please complete all required fields.");
      setIsLoading(false);
      return;
    }
    
    if (!isLogin && (!formData.firstName.trim() || !formData.lastName.trim())) {
      setErrorMessage("Please enter your first and last name.");
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const response = await loginUser(formData.email, formData.password);
        localStorage.setItem("ACCESS_TOKEN", response.data.access_token);
        toast.success("Welcome back to LUXERA!");
        setAuthenticatedUser(response.data);
        setTimeout(() => navigate("/"), 2000);
      } else {
        await registerUser({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        });
        toast.success("Account created! Please sign in.");
        switchMode(true);
        setFormData({ firstName: "", lastName: "", email: "", password: "" });
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Something went wrong!";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    setAuthenticatedUser(null);
    setFormData({ firstName: "", lastName: "", email: "", password: "" });
    setErrorMessage("");
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col justify-between bg-[#080808] text-[#F5F1E8]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      <div className="absolute inset-0 bg-black/70 lg:bg-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none hidden lg:block" />

    
      <header className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-6 flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl tracking-[0.3em]">LUXERA</h2>
          <p className="text-[9px] text-[#D8B45A] tracking-[0.3em] uppercase mt-1">
            Fine Perfumery
          </p>
        </div>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-16">
        
        <section className="hidden lg:flex w-full lg:w-1/2 flex-col justify-center">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles size={15} className="text-[#D8B45A]" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#D8B45A]">
              Discover Your Signature
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] max-w-xl text-white drop-shadow-lg">
            A scent that
            <span className="block italic text-[#D8B45A] mt-2">defines you.</span>
          </h1>

          <p className="text-white/80 text-sm md:text-base leading-7 mt-6 max-w-md drop-shadow-md">
            Discover timeless fragrances and find the scent that expresses your individuality.
          </p>
        </section>

      
        <section className="w-full lg:w-[440px] flex justify-center lg:justify-end">
          <div className="w-full max-w-[440px] bg-[#0B0B0D]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-9 shadow-[0_20px_70px_rgba(0,0,0,0.8)]">
            
            {authenticatedUser ? (
              <div className="text-center py-8 space-y-5">
                <CheckCircle2 size={52} className="mx-auto text-[#D8B45A]" />
                <h2 className="font-serif text-3xl">Welcome to LUXERA</h2>
                <p className="text-white/60 text-sm">{formData.email.split('@')[0]}</p>
                <button
                  onClick={() => navigate("/")}
                  className="w-full py-3 bg-[#D8B45A] text-black rounded-lg font-medium hover:bg-[#E7C779] transition-colors"
                >
                  Explore Collection
                </button>
                <button
                  onClick={handleSignOut}
                  className="text-xs text-white/50 hover:text-white underline"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-7">
                  <p className="text-[#D8B45A] text-[10px] tracking-[0.3em] uppercase mb-3">
                    {isLogin ? "Welcome Back" : "Join LUXERA"}
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl">
                    {isLogin ? "Sign In" : "Create Account"}
                  </h2>
                </div>
                <div className="grid grid-cols-2 border-b border-white/10 mb-7">
                  <button
                    onClick={() => switchMode(true)}
                    className={`py-3 text-sm transition-all border-b-2 ${
                      isLogin ? "border-[#D8B45A] text-[#D8B45A]" : "border-transparent text-white/45 hover:text-white/70"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => switchMode(false)}
                    className={`py-3 text-sm transition-all border-b-2 ${
                      !isLogin ? "border-[#D8B45A] text-[#D8B45A]" : "border-transparent text-white/45 hover:text-white/70"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {errorMessage && (
                  <div className="mb-5 p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs">
                    {errorMessage}
                  </div>
                )}

                {forgotMessage && (
                  <div className="mb-5 p-3 rounded-lg bg-[#D8B45A]/10 border border-[#D8B45A]/30 text-[#E5C77C] text-xs">
                    {forgotMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {!isLogin && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-white/75 mb-2">First Name</label>
                        <div className="flex items-center gap-3 bg-[#080808] border border-white/10 rounded-lg px-4 h-12 focus-within:border-[#D8B45A] transition-colors">
                          <User size={17} className="text-white/35" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First name"
                            required
                            className="w-full bg-transparent outline-none text-sm placeholder:text-white/30"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-white/75 mb-2">Last Name</label>
                        <div className="flex items-center gap-3 bg-[#080808] border border-white/10 rounded-lg px-4 h-12 focus-within:border-[#D8B45A] transition-colors">
                          <User size={17} className="text-white/35" />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last name"
                            required
                            className="w-full bg-transparent outline-none text-sm placeholder:text-white/30"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs text-white/75 mb-2">Email Address</label>
                    <div className="flex items-center gap-3 bg-[#080808] border border-white/10 rounded-lg px-4 h-12 focus-within:border-[#D8B45A] transition-colors">
                      <Mail size={17} className="text-white/35" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        required
                        className="w-full bg-transparent outline-none text-sm placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/75 mb-2">Password</label>
                    <div className="flex items-center gap-3 bg-[#080808] border border-white/10 rounded-lg px-4 h-12 focus-within:border-[#D8B45A] transition-colors">
                      <Lock size={17} className="text-white/35" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        minLength={8}
                        className="w-full bg-transparent outline-none text-sm placeholder:text-white/30"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-white/40 hover:text-[#D8B45A]"
                      >
                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </div>

                  {isLogin && (
                    <div className="flex justify-end -mt-2">
                      <button
                        type="button"
                        onClick={() => setForgotMessage("Password recovery is not connected yet.")}
                        className="text-xs text-[#D8B45A] hover:text-[#F0D28B] transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 mt-2 flex items-center justify-center gap-3 bg-[#D8B45A] text-[#111111] rounded-lg font-semibold text-sm hover:bg-[#E8C675] transition-all disabled:opacity-50"
                  >
                    {isLoading ? "PLEASE WAIT..." : isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
                    {!isLoading && <ArrowRight size={17} />}
                  </button>
                </form>

                <div className="text-center mt-7 text-sm">
                  <span className="text-white/45">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                  </span>
                  <button
                    onClick={() => switchMode(!isLogin)}
                    className="ml-2 text-[#D8B45A] hover:text-[#F0D28B] font-medium"
                  >
                    {isLogin ? "Sign Up" : "Sign In"}
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <footer className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <p className="text-[10px] text-white/40">© 2026 LUXERA Fine Perfumery. All rights reserved.</p>
        <p className="text-[10px] text-white/40 tracking-wider">DISCOVER YOUR SIGNATURE</p>
      </footer>
    </div>
  );
}