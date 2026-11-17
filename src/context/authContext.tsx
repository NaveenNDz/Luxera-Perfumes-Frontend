import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { User, AuthSuccessData } from '../service/auth';

interface AuthContextType {
  user: User | null;
  login: (data: AuthSuccessData) => void;
  logout: () => void;
  signOut: () => void;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const login = (data: AuthSuccessData) => {
    const currentUser: User = {
      firstName: data.firstName,
      email: data.email,
      roles: data.roles || ['USER'],
    };

    setUser(currentUser);
    localStorage.setItem('user', JSON.stringify(currentUser));

    if (data.access_token) {
      localStorage.setItem('ACCESS_TOKEN', data.access_token);
      localStorage.setItem('token', data.access_token);
    }

    if (data.refresh_token) {
      localStorage.setItem('REFRESH_TOKEN', data.refresh_token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('token');
    localStorage.removeItem('REFRESH_TOKEN');
  };

  const signOut = logout;

  return (
    <AuthContext.Provider value={{ user, login, logout, signOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
