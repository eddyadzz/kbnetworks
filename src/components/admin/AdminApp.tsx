import React, { useState, useEffect } from 'react';
import { getCurrentAdminUser, type AdminUser } from '../../lib/supabase';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminApp: React.FC = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const user = await getCurrentAdminUser();
      setAdminUser(user);
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (user: AdminUser) => {
    setAdminUser(user);
  };

  const handleLogout = () => {
    setAdminUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!adminUser) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard adminUser={adminUser} onLogout={handleLogout} />;
};

export default AdminApp;