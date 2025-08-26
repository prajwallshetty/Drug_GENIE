import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, User, Search, Heart, LogOut, Menu, X } from 'lucide-react';
import { getCurrentUser, logoutUser } from '../utils/storage';
import { useNavigate } from 'react-router-dom';
import { notificationService } from '../services/notificationService';
import NotificationDropdown from './NotificationDropdown';
import toast from 'react-hot-toast';

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    loadUnreadCount();
    // Poll for new notifications every 30 seconds
    const interval = setInterval(loadUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadUnreadCount = async () => {
    try {
      const count = await notificationService.getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      // Silently fail - user might not be authenticated
    }
  };

  const handleLogout = () => {
    logoutUser();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationClose = () => {
    setShowNotifications(false);
    // Refresh unread count when dropdown closes
    loadUnreadCount();
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200 px-6 py-4 fixed w-full top-0 z-50"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle Button */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                DrugGenIe
              </span>
              <p className="text-xs text-gray-500 -mt-1">Healthcare Assistant</p>
            </div>
          </motion.div>
          
          {/* Search Box */}
          <div className="hidden md:flex items-center space-x-2 bg-gray-50 rounded-xl px-4 py-2 ml-8 border border-gray-200">
            <Search className="h-4 w-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search medicines, symptoms..."
              className="bg-transparent border-none outline-none text-sm w-64 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Right side (Notifications + Profile) */}
        <div className="flex items-center space-x-4">
          {/* Notification */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNotificationClick}
              className="relative p-3 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium"
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </motion.span>
              )}
            </motion.button>
            
            <NotificationDropdown 
              isOpen={showNotifications}
              onClose={handleNotificationClose}
            />
          </div>
          
          {/* Profile + Dropdown */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-gray-900">
                {currentUser?.name || 'Guest User'}
              </p>
              <p className="text-xs text-gray-500">
                {currentUser?.bloodGroup || 'Unknown'} • {currentUser?.age || 'N/A'} years
              </p>
            </div>
            
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="h-10 w-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center cursor-pointer shadow-lg"
              >
                <User className="h-5 w-5 text-white" />
              </motion.div>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-3 border-b border-gray-100">
                  <p className="font-semibold text-gray-900">{currentUser?.name}</p>
                  <p className="text-sm text-gray-500">{currentUser?.email}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
