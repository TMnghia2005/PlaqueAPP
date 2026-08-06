import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthService } from './services/auth.service';

interface AuthContextType {
  user: any | null;
  token: string | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const userData = await AuthService.getMe();
          setUser(userData);
        } catch (error) {
          logout();
        }
      }
      setIsLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = async (email: string, pass: string) => {
    const { user: userData, token: userToken } = await AuthService.login(email, pass);
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
