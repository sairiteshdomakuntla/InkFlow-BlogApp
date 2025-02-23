import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Users, Shield } from 'lucide-react';
import './AdminProfile.css';
import { motion } from 'framer-motion';

function AdminProfile() {
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="admin-title">
            <Shield className="w-6 h-6 text-red-500" />
            Admin Dashboard
          </h1>
          
          <nav className="admin-nav">
            <ul className="flex gap-4">
              <li>
                <NavLink 
                  to="UsersnAuthors" 
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'nav-link-active' : ''}`
                  }
                >
                  <Users className="w-5 h-5" />
                  Users & Authors
                </NavLink>
              </li>
              {/* Commented nav item styled for future use
              <li>
                <NavLink 
                  to="blockedusers" 
                  className={({ isActive }) => `
                    px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300
                    ${isActive 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white border border-gray-800'
                    }
                  `}
                >
                  <Lock className="w-5 h-5" />
                  Blocked Users
                </NavLink>
              </li>
              */}
            </ul>
          </nav>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="admin-content"
      >
        <Outlet />
      </motion.div>
    </div>
  );
}

export default AdminProfile;