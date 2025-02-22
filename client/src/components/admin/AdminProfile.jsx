import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Users, Shield } from 'lucide-react';

function AdminProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black pt-16">
      <div className="container mx-auto px-4">
        {/* Navigation Header */}
        <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-8">
          <h1 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-primary-400" />
            Admin Dashboard
          </h1>
          
          <nav>
            <ul className="flex flex-wrap gap-4">
              <li>
                <NavLink 
                  to="UsersnAuthors" 
                  className={({ isActive }) => `
                    px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300
                    ${isActive 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white border border-gray-800'
                    }
                  `}
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
        </div>

        {/* Outlet Container */}
        <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;