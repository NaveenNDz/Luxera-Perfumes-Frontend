import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, registerUser } from "../../service/auth";
import { AuthContext } from "../../context/authContext";
import toast from "react-hot-toast";

export default function AuthForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const response = await loginUser(email, password);
        login(response.data);

        toast.success("Welcome back!");

        if (response.data.roles?.includes("ADMIN")) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        await registerUser({ firstName, lastName, email, password });
        toast.success("Account created! Please sign in.");
        setIsLogin(true);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#0c0c11] border border-white/10 rounded-2xl p-8 shadow-2xl text-white">
      <Link
        to="/"
        className="block text-center text-2xl font-serif text-[#D8B45A] mb-6"
      >
        LUXERA
      </Link>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="grid grid-cols-2 gap-2">
            <input
              required
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-black/50 border border-white/10 p-3 rounded text-sm outline-none focus:border-[#D8B45A]"
            />
            <input
              required
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-black/50 border border-white/10 p-3 rounded text-sm outline-none focus:border-[#D8B45A]"
            />
          </div>
        )}

        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-black/50 border border-white/10 p-3 rounded text-sm outline-none focus:border-[#D8B45A]"
        />

        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-black/50 border border-white/10 p-3 rounded text-sm outline-none focus:border-[#D8B45A]"
        />

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-[#D8B45A] text-black font-bold p-3 rounded disabled:opacity-50"
        >
          {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <p
        className="text-center text-xs mt-4 text-gray-400 cursor-pointer hover:text-white"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Create an account" : "Already have an account? Sign In"}
      </p>
    </div>
  );
}