
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Admin {
  id: string;
  email: string;
  created_at: string;
}

interface AdminAuthContextType {
  admin: Admin | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is stored in localStorage
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // In a real app, you'd hash the password and compare with stored hash
      // For demo purposes, we'll check if admin exists with this email
      const { data: adminData, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !adminData) {
        return { error: 'Invalid credentials' };
      }

      const adminUser: Admin = {
        id: adminData.id,
        email: adminData.email,
        created_at: adminData.created_at,
      };

      setAdmin(adminUser);
      localStorage.setItem('admin', JSON.stringify(adminUser));
      toast.success('Successfully signed in!');
      return {};
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: 'Failed to sign in' };
    }
  };

  const signOut = async () => {
    setAdmin(null);
    localStorage.removeItem('admin');
    toast.success('Successfully signed out!');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
