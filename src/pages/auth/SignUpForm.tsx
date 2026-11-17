import { type FormEvent, type ChangeEvent } from 'react';
import { User as UserIcon, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface SignUpFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export default function SignUpForm({
  formData,
  onChange,
  onSubmit,
  isLoading,
  showPassword,
  setShowPassword,
}: SignUpFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-white/75 mb-1.5">First Name</label>
          <div className="flex items-center gap-2 bg-[#080808] border border-white/10 rounded-lg px-3 h-12 focus-within:border-[#D8B45A] transition-colors">
            <UserIcon size={16} className="text-white/35 shrink-0" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onChange}
              placeholder="First name"
              required
              className="w-full bg-transparent outline-none text-sm placeholder:text-white/30 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-white/75 mb-1.5">Last Name</label>
          <div className="flex items-center gap-2 bg-[#080808] border border-white/10 rounded-lg px-3 h-12 focus-within:border-[#D8B45A] transition-colors">
            <UserIcon size={16} className="text-white/35 shrink-0" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onChange}
              placeholder="Last name"
              required
              className="w-full bg-transparent outline-none text-sm placeholder:text-white/30 text-white"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs text-white/75 mb-1.5">Email Address</label>
        <div className="flex items-center gap-3 bg-[#080808] border border-white/10 rounded-lg px-4 h-12 focus-within:border-[#D8B45A] transition-colors">
          <Mail size={17} className="text-white/35" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="name@example.com"
            autoComplete="email"
            required
            className="w-full bg-transparent outline-none text-sm placeholder:text-white/30 text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-white/75 mb-1.5">Password</label>
        <div className="flex items-center gap-3 bg-[#080808] border border-white/10 rounded-lg px-4 h-12 focus-within:border-[#D8B45A] transition-colors">
          <Lock size={17} className="text-white/35" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={onChange}
            placeholder="Enter your password"
            autoComplete="new-password"
            required
            className="w-full bg-transparent outline-none text-sm placeholder:text-white/30 text-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="text-white/40 hover:text-[#D8B45A] cursor-pointer"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 mt-2 flex items-center justify-center gap-2 bg-[#D8B45A] hover:bg-[#E8C675] text-black font-semibold text-xs tracking-wider uppercase rounded-lg transition-all duration-300 shadow-[0_8px_25px_rgba(216,180,90,0.3)] hover:shadow-[0_10px_35px_rgba(216,180,90,0.45)] cursor-pointer disabled:opacity-50"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
