import { createContext, useContext } from 'react';
import { User, UserRole } from '@/types/user';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email?: string, role?: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
