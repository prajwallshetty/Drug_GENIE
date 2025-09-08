import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar onToggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="flex pt-20 flex-1">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} />

        {/* Main Content */}
        <main
          className={`flex-1 p-6 transition-all duration-300 ${
            isSidebarOpen ? 'ml-72' : 'ml-0'
          }`}
        >
          <Outlet />
        </main>
      </div>
      
      {/* Footer */}
      <Footer />                                                                             
    </div>
  );
};

export default Layout;                                              
                       