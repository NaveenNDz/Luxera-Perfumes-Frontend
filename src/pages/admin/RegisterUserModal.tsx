import { useState, type FormEvent, type ChangeEvent } from 'react';
import { X, UserPlus, Mail, Lock, User as UserIcon, Shield } from 'lucide-react';
import { registerUser } from '../../service/auth';
import toast from 'react-hot-toast';

interface RegisterUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function RegisterUserModal({
  isOpen,
  onClose,
  onSuccess,
}: RegisterUserModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'STAFF' as 'ADMIN' | 'STAFF',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error('First and last names are required');
      return;
    }

    if (!formData.email.trim() || !formData.password) {
      toast.error('Email and password are required');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await registerUser({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
      });

      toast.success(response.message || `Registered as ${formData.role}`);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'STAFF',
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to register user';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 text-black">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-md bg-white border border-[#E2DDD5] rounded-2xl p-7 shadow-2xl z-10 space-y-5">
        <div className="flex items-center justify-between border-b border-[#E2DDD5] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#C6A45A]/15 text-[#8F6F27]">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#292929]">Register User</h3>
              <p className="text-xs text-[#77736B]">Add Admin or Staff account</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#77736B] hover:text-[#292929] cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">First Name</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus-within:border-black">
                <UserIcon size={14} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  required
                  className="w-full bg-transparent outline-none text-xs text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus-within:border-black">
                <UserIcon size={14} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                  className="w-full bg-transparent outline-none text-xs text-gray-900"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus-within:border-black">
              <Mail size={14} className="text-gray-400 shrink-0" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="user@example.com"
                required
                className="w-full bg-transparent outline-none text-xs text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus-within:border-black">
              <Lock size={14} className="text-gray-400 shrink-0" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                required
                className="w-full bg-transparent outline-none text-xs text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">System Role</label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus-within:border-black">
              <Shield size={14} className="text-gray-400 shrink-0" />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-xs text-gray-900 cursor-pointer"
              >
                <option value="STAFF">Staff Member</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2DDD5]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-black hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Registering...' : 'Register User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

