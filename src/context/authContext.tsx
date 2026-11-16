import { createContext, useState, type ReactNode } from "react";

export const AuthContext = createContext<any>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<any>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;

  });

  const login = (data: any) => {
    
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("ACCESS_TOKEN", data.access_token);
    localStorage.setItem("REFRESH_TOKEN", data.refresh_token);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}