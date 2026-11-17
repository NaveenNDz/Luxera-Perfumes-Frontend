import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { X, Edit2, Mail, User as UserIcon, Shield } from 'lucide-react';
import type { User as UserType } from '../../service/auth';

interface EditUserModalProps {
  isOpen: boolean;
  user: UserType | null;
  onClose: () => void;
  onUpdate: (
    userId: string,
    data: {
      firstName: string;
      lastName: string;
      email: string;
      role: 'ADMIN' | 'STAFF';
    }
  ) => Promise<void>;
}

export default function EditUserModal({
  isOpen,
  user,
  onClose,
  onUpdate,
}: EditUserModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'STAFF' as 'ADMIN' | 'STAFF',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        role: user.roles?.includes('ADMIN') ? 'ADMIN' : 'STAFF',
      });
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const userId = user._id || user.id;
    if (!userId) return;

    setIsSubmitting(true);
    try {
      await onUpdate(userId, {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        role: formData.role,
      });
      onClose();
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
              <Edit2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#292929]">Edit User Account</h3>
              <p className="text-xs text-[#77736B]">Update profile and role permissions</p>
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
                required
                className="w-full bg-transparent outline-none text-xs text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Assigned Role</label>
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
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}