import { useState, type FormEvent, type ChangeEvent } from "react";
import { Sparkles, AlertCircle } from "lucide-react";
import {
  loginUser,
  registerUser,
  type User as UserType,
} from "../../service/auth";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";
import AuthHeader from "./AuthHeader";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import UserProfileCard from "./UserProfileCard";
import luxuryBg from "../../assets/luxera-luxury-auth-bg.jpg";

export interface AuthPageProps {
  initialMode?: "signin" | "signup";
  onBackToStorefront?: () => void;
  onSignInSuccess?: (user: UserType) => void;
  onSwitchToAdmin?: () => void;
}

export default function AuthPage({
  initialMode = "signin",
  onBackToStorefront,
  onSignInSuccess,
  onSwitchToAdmin,
}: AuthPageProps) {
  const { user: contextUser, login, signOut } = useAuth();

  const [isLogin, setIsLogin] = useState<boolean>(initialMode !== "signup");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [forgotMessage, setForgotMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSignInChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage("");
    setForgotMessage("");
  };

  const handleSignUpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage("");
    setForgotMessage("");
  };

  const switchMode = (loginMode: boolean) => {
    setIsLogin(loginMode);
    setErrorMessage("");
    setSuccessMessage("");
    setForgotMessage("");
  };

  const handleSignInSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!signInData.email || !signInData.password) {
      setErrorMessage("Please fill in both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginUser({
        email: signInData.email.trim(),
        password: signInData.password,
      });

      login(response.data);

      const loggedInUser: UserType = {
        firstName: response.data.firstName,
        email: response.data.email,
        roles: response.data.roles,
      };

      toast.success(response.message || "Login successful!");

      if (onSignInSuccess) {
        onSignInSuccess(loggedInUser);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || "Invalid email or password.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!signUpData.firstName.trim() || !signUpData.lastName.trim()) {
      setErrorMessage("Please provide both your first name and last name.");
      return;
    }

    if (!signUpData.email.trim() || !signUpData.password) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (signUpData.password.length < 6) {
      setErrorMessage("Password must contain at least 6 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerUser({
        firstName: signUpData.firstName.trim(),
        lastName: signUpData.lastName.trim(),
        email: signUpData.email.trim(),
        password: signUpData.password,
      });

      setSuccessMessage(
        response.message || "Account created successfully! Please sign in.",
      );
      toast.success("Registration successful. Please sign in.");
      setIsLogin(true);
      setSignInData({
        email: signUpData.email.trim(),
        password: signUpData.password,
      });
    } catch (err: any) {
      const msg =
        err.response?.data?.message || "Registration failed. Please try again.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut();
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="relative min-h-dvh bg-[#070605] text-[#F5F1E8] flex flex-col justify-between selection:bg-[#D8B45A]/30 selection:text-white overflow-x-hidden">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat pointer-events-none transition-all duration-700 bg-[28%_center] sm:bg-center"
        style={{
          backgroundImage: `url(${luxuryBg})`,
        }}
      />

      <div className="absolute inset-0 bg-black/35 sm:bg-black/25 pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-black/85 via-black/30 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070605] via-transparent to-[#070605]/70 pointer-events-none" />

      <div
        className="absolute top-1/4 left-1/3 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[150px] opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)",
        }}
      />

      <AuthHeader />

      <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-6 lg:py-0 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14">
        <section className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 sm:space-y-6 pt-2 lg:pt-0 text-center lg:text-left items-center lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-[#D8B45A]/40 backdrop-blur-md mb-3 sm:mb-4 shadow-xl">
              <Sparkles size={13} className="text-[#D8B45A] animate-pulse" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D8B45A] font-semibold">
                Luxera perfumes · THE ART OF FINE FRAGRANCE
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] max-w-xl font-bold tracking-tight drop-shadow-lg">
              A scent that
              <span className="block italic text-[#D8B45A] mt-1 font-normal">
                defines you.
              </span>
            </h1>

            <p className="text-white/85 text-xs sm:text-sm md:text-base leading-relaxed mt-3 sm:mt-5 max-w-md lg:max-w-lg drop-shadow">
              Explore our curated selection of 100% original flacons crafted
              with long-lasting projection engineered for the Sri Lankan
              climate.
            </p>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 pt-1 text-xs text-zinc-200">
            <div className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="font-medium text-[11px] sm:text-xs">Luxury</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#D8B45A] shrink-0" />
              <span className="font-medium text-[11px] sm:text-xs">Luxury</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#D8B45A] shrink-0" />
              <span className="font-medium text-[11px] sm:text-xs">
                Sophistication
              </span>
            </div>
          </div>
        </section>

        <section className="w-full lg:w-[440px] shrink-0 flex justify-center lg:justify-end pb-8 lg:pb-0">
          <div className="w-full max-w-[440px] bg-[#0c0c12]/85 backdrop-blur-2xl border border-white/15 rounded-2xl p-5 sm:p-8 lg:p-9 shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
            {contextUser ? (
              <UserProfileCard
                user={contextUser}
                onBackToStorefront={onBackToStorefront}
                onSwitchToAdmin={onSwitchToAdmin}
                onSignOut={handleSignOut}
              />
            ) : (
              <>
                <div className="text-center mb-5 sm:mb-6">
                  <p className="text-[#D8B45A] text-[10px] tracking-[0.3em] uppercase mb-1.5 sm:mb-2 font-semibold">
                    {isLogin ? "Welcome Back" : "Create Account"}
                  </p>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold">
                    {isLogin ? "Sign In" : "Sign Up"}
                  </h2>
                  <p className="text-white/60 text-xs sm:text-sm mt-1.5 sm:mt-2">
                    {isLogin
                      ? "Sign in to access your account."
                      : "Register a new account to begin."}
                  </p>
                </div>

                <div className="grid grid-cols-2 border-b border-white/10 mb-5 sm:mb-6">
                  <button
                    type="button"
                    onClick={() => switchMode(true)}
                    className={`py-2.5 sm:py-3 text-xs sm:text-sm transition-all border-b-2 cursor-pointer font-medium ${
                      isLogin
                        ? "border-[#D8B45A] text-[#D8B45A]"
                        : "border-transparent text-white/45"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => switchMode(false)}
                    className={`py-2.5 sm:py-3 text-xs sm:text-sm transition-all border-b-2 cursor-pointer font-medium ${
                      !isLogin
                        ? "border-[#D8B45A] text-[#D8B45A]"
                        : "border-transparent text-white/45"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {errorMessage && (
                  <div
                    role="alert"
                    className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs"
                  >
                    {errorMessage}
                  </div>
                )}

                {successMessage && (
                  <div
                    role="status"
                    className="mb-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs"
                  >
                    {successMessage}
                  </div>
                )}

                {forgotMessage && (
                  <div
                    role="status"
                    className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2 animate-fadeIn"
                  >
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{forgotMessage}</span>
                  </div>
                )}

                {isLogin ? (
                  <SignInForm
                    formData={signInData}
                    onChange={handleSignInChange}
                    onSubmit={handleSignInSubmit}
                    isLoading={isLoading}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    onForgotPassword={() => {
                      setForgotMessage("Currently unavailable.");
                      toast("Currently unavailable.", { icon: "ℹ️" });
                    }}
                  />
                ) : (
                  <SignUpForm
                    formData={signUpData}
                    onChange={handleSignUpChange}
                    onSubmit={handleSignUpSubmit}
                    isLoading={isLoading}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <footer className="relative z-10 py-3.5 sm:py-4 text-center text-[10px] text-zinc-400/80 border-t border-white/5 backdrop-blur-sm">
        © 2026 LUXERA Fine Fragrance House · All Rights Reserved
      </footer>
    </div>
  );
}
