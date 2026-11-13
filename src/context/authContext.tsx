import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null);

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoading(true);
      axios
        .get("http://localhost:3000/api/v1/auth/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data?.data) {
            setUser(res.data.data);
          } else {
            setUser(null);
          }
        })
        .catch((err) => {
          console.error(err);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}