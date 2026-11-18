import { CheckCircle2 } from "lucide-react";
import type { User as UserType } from "../../service/auth";

interface UserProfileCardProps {
  user: UserType;
  onBackToStorefront?: () => void;
  onSwitchToAdmin?: () => void;
  onSignOut: () => void;
}

export default function UserProfileCard({
  user,
  onBackToStorefront,
  onSwitchToAdmin,
  onSignOut,
}: UserProfileCardProps) {
  const isAdmin = user.roles?.includes("ADMIN");

  return (
    <div className="text-center py-8 space-y-5">
      <CheckCircle2 size={52} className="mx-auto text-[#D8B45A]" />
      <h2 className="font-serif text-3xl">Welcome Back</h2>
      <p className="text-white/60 text-sm font-medium">
        {user.firstName} {user.lastName || ""}
      </p>
      <p className="text-white/40 text-xs font-mono">{user.email}</p>

      {onBackToStorefront && (
        <button
          onClick={onBackToStorefront}
          className="w-full py-3 bg-[#D8B45A] text-black rounded-lg font-semibold hover:bg-[#E7C779] transition-colors cursor-pointer text-xs uppercase tracking-wider"
        >
          Explore Collection
        </button>
      )}

      {isAdmin && onSwitchToAdmin && (
        <button
          onClick={onSwitchToAdmin}
          className="w-full py-3 border border-white/15 rounded-lg text-xs uppercase tracking-wider font-semibold hover:border-[#D8B45A] hover:text-[#D8B45A] transition-colors cursor-pointer"
        >
          Admin Panel
        </button>
      )}

      <button
        onClick={onSignOut}
        className="text-xs text-white/50 hover:text-white underline cursor-pointer"
      >
        Sign out
      </button>
    </div>
  );
}
