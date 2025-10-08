import React, { useState, useEffect } from 'react';
import { LogOut, FolderOpen, Image, Plus, Settings, BarChart3, Key } from 'lucide-react';
import { signOutAdmin, getProjects, getGalleryImages, type AdminUser } from '../../lib/supabase';
import ProjectManager from './ProjectManager';
import GalleryManager from './GalleryManager';
import PasswordChange from './PasswordChange';

interface AdminDashboardProps {
  adminUser: AdminUser;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ adminUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'gallery'>('overview');
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    totalImages: 0,
    activeImages: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [projects, images] = await Promise.all([
        getProjects(true), // Include unpublished
        getGalleryImages(true) // Include inactive
      ]);

      setStats({
        totalProjects: projects.length,
        publishedProjects: projects.filter(p => p.is_published).length,
        totalImages: images.length,
        activeImages: images.filter(i => i.is_active).length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOutAdmin();
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'gallery', label: 'Gallery', icon: Image }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">KB Networks CMS</h1>
                <p className="text-gray-600 dark:text-gray-400">Content Management System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{adminUser.full_name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{adminUser.role}</p>
              </div>
              <button
                onClick={() => setShowPasswordChange(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                title="Change Password"
              >
                <Key className="w-4 h-4" />
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard Overview</h2>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm animate-pulse">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <FolderOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Total Projects</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalProjects}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">All projects in system</p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <Plus className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Published</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.publishedProjects}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Live on website</p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <Image className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Gallery Images</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalImages}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total images uploaded</p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                        <Image className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Active Images</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.activeImages}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Visible in gallery</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('projects')}
                  className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                >
                  <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-blue-600 dark:text-blue-400">Add New Project</span>
                </button>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-200"
                >
                  <Plus className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-green-600 dark:text-green-400">Add Gallery Image</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && <ProjectManager onStatsUpdate={loadStats} />}
        {activeTab === 'gallery' && <GalleryManager onStatsUpdate={loadStats} />}
      </main>

      {showPasswordChange && (
        <PasswordChange
          adminUser={adminUser}
          onClose={() => setShowPasswordChange(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;