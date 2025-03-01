import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Users, Shield } from 'lucide-react';
import './AdminProfile.css';
import { motion } from 'framer-motion';

function AdminProfile() {
  return (
    <div className="admin-dashboard">
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