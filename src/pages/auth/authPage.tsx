import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Sparkles } from 'lucide-react';
import { loginUser, registerUser, type User as UserType } from '../../service/auth';
import { useAuth } from '../../context/authContext';
import toast from 'react-hot-toast';
import AuthHeader from './AuthHeader';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import UserProfileCard from './UserProfileCard';

export interface AuthPageProps {
  initialMode?: 'signin' | 'signup';
  onBackToStorefront?: () => void;
  onSignInSuccess?: (user: UserType) => void;
  onSwitchToAdmin?: () => void;
}

export default function AuthPage({
  initialMode = 'signin',
  onBackToStorefront,
  onSignInSuccess,
  onSwitchToAdmin,
}: AuthPageProps) {
  const { user: contextUser, login, signOut } = useAuth();

  const [isLogin, setIsLogin] = useState<boolean>(initialMode !== 'signup');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [forgotMessage, setForgotMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleSignInChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage('');
    setForgotMessage('');
  };

  const handleSignUpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage('');
    setForgotMessage('');
  };

  const switchMode = (loginMode: boolean) => {
    setIsLogin(loginMode);
    setErrorMessage('');
    setSuccessMessage('');
    setForgotMessage('');
  };

  const handleSignInSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!signInData.email || !signInData.password) {
      setErrorMessage('Please fill in both email and password.');
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

      toast.success(response.message || 'Login successful!');

      if (onSignInSuccess) {
        onSignInSuccess(loggedInUser);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Invalid email or password.';
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!signUpData.firstName.trim() || !signUpData.lastName.trim()) {
      setErrorMessage('Please provide both your first name and last name.');
      return;
    }

    if (!signUpData.email.trim() || !signUpData.password) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    if (signUpData.password.length < 6) {
      setErrorMessage('Password must contain at least 6 characters.');
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

      setSuccessMessage(response.message || 'Account created successfully! Please sign in.');
      toast.success('Registration successful. Please sign in.');
      setIsLogin(true);
      setSignInData({
        email: signUpData.email.trim(),
        password: signUpData.password,
      });
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut();
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div
      className="relative min-h-dvh lg:h-dvh lg:overflow-hidden bg-[#080808] text-[#F5F1E8] flex flex-col"
      style={{
        backgroundImage: "url('/assets/etera-auth-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-black/25 to-black/80 pointer-events-none" />

      <AuthHeader onBackToStorefront={onBackToStorefront} />

      <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-8 lg:py-0 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        <section className="w-full lg:w-1/2 flex flex-col justify-center lg:pt-0 pt-6">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles size={15} className="text-[#D8B45A]" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#D8B45A]">
              Discover Your Signature
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] max-w-xl">
            A scent that
            <span className="block italic text-[#D8B45A] mt-2">defines you.</span>
          </h1>

          <p className="text-white/65 text-sm md:text-base leading-7 mt-6 max-w-md">
            Explore our exclusive collection of fragrances crafted for your individuality.
          </p>

          <div className="w-16 h-[1px] bg-[#D8B45A] mt-8 mb-5" />

          <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
            The art of fine fragrance
          </p>
        </section>

        <section className="w-full lg:w-[440px] shrink-0 flex justify-center lg:justify-end pb-8 lg:pb-0">
          <div className="w-full max-w-[440px] bg-[#0B0B0D]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-9 shadow-[0_20px_70px_rgba(0,0,0,0.5)]">
            {contextUser ? (
              <UserProfileCard
                user={contextUser}
                onBackToStorefront={onBackToStorefront}
                onSwitchToAdmin={onSwitchToAdmin}
                onSignOut={handleSignOut}
              />
            ) : (
              <>
                <div className="text-center mb-7">
                  <p className="text-[#D8B45A] text-[10px] tracking-[0.3em] uppercase mb-3">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl">
                    {isLogin ? 'Sign In' : 'Sign Up'}
                  </h2>
                  <p className="text-white/50 text-sm mt-3">
                    {isLogin ? 'Sign in to access your account.' : 'Register a new account to begin.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 border-b border-white/10 mb-7">
                  <button
                    type="button"
                    onClick={() => switchMode(true)}
                    className={`py-3 text-sm transition-all border-b-2 cursor-pointer ${
                      isLogin ? 'border-[#D8B45A] text-[#D8B45A]' : 'border-transparent text-white/45'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => switchMode(false)}
                    className={`py-3 text-sm transition-all border-b-2 cursor-pointer ${
                      !isLogin ? 'border-[#D8B45A] text-[#D8B45A]' : 'border-transparent text-white/45'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {errorMessage && (
                  <div role="alert" className="mb-5 p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs">
                    {errorMessage}
                  </div>
                )}

                {successMessage && (
                  <div role="status" className="mb-5 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
                    {successMessage}
                  </div>
                )}

                {forgotMessage && (
                  <div role="status" className="mb-5 p-3 rounded-lg bg-[#D8B45A]/10 border border-[#D8B45A]/30 text-[#E5C77C] text-xs">
                    {forgotMessage}
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
                    onForgotPassword={() =>
                      setForgotMessage('Please contact salon administration for password recovery.')
                    }
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
    </div>
  );
}
