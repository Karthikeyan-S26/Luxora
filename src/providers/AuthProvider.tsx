import { ReactNode, useState, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { User, UserRole } from '@/types/user';
import { toast } from 'sonner';

const defaultUser: User = {
  id: 'usr-101',
  name: 'Alex Vance',
  email: 'alex.vance@novacart.store',
  role: 'customer',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  phone: '+1 (555) 234-5678',
  savedAddresses: [
    {
      id: 'addr-1',
      label: 'Home (Default)',
      street: '742 Evergreen Terrace',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'United States',
      isDefault: true
    }
  ]
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(defaultUser);

  const login = (email?: string, role: UserRole = 'customer') => {
    const newUser: User = {
      ...defaultUser,
      email: email || defaultUser.email,
      role: role
    };
    setUser(newUser);
    toast.success(`Welcome back, ${newUser.name}!`);
  };

  const logout = () => {
    setUser(null);
    toast.info('Logged out successfully.');
  };

  const switchRole = (role: UserRole) => {
    if (!user) return;
    setUser({ ...user, role });
    toast.success(`Switched role to ${role}`);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
