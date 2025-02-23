import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import { userAuthorContextObj } from '../../contexts/UserAuthorContext';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../../assets/logo4.avif';
import './Header.css';

const Header = () => {
  const { signOut } = useClerk();
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const navigate = useNavigate();
  const { isSignedIn, user, isLoaded } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setCurrentUser(null);
      localStorage.clear();
      navigate('/');
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <motion.img 
            src={logo} 
            alt="InkFlow" 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            className="logo-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            InkFlow
          </motion.span>
        </Link>

        {/* Desktop Navigation - Only visible on desktop */}
        <nav className="nav-links hidden md:flex">
          {!isSignedIn ? (
            <div className="flex items-center space-x-4">
              <Link 
                to="/signin"
                className="nav-link"
              >
                Sign In
              </Link>
              <Link 
                to="/signup"
                className="signout-button"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="user-profile">
              <div className="user-image-container">
                <img 
                  src={user.imageUrl}
                  alt={user.firstName}
                  className="w-7 h-7 rounded-full"
                />
                {currentUser?.role && (
                  <span className="user-role">
                    {currentUser.role}
                  </span>
                )}
              </div>
              <span className="username">
                {user.firstName}
              </span>
              <button
                onClick={handleSignOut}
                className="signout-button"
              >
                Sign Out
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          ) : (
            <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Mobile Navigation - Only visible when menu is clicked */}
      <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)} />
      <motion.nav
        className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}
        initial={false}
      >
        <div className="mobile-nav-content">
          <button 
            className="close-button"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
          {!isSignedIn ? (
            <div className="mobile-auth-buttons">
              <Link 
                to="/signin"
                className="mobile-signin"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/signup"
                className="mobile-signup"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="mobile-user-profile">
              <div className="mobile-user-info">
                <img
                  src={user.imageUrl}
                  alt={user.firstName}
                  className="mobile-user-image"
                />
                <span className="mobile-username">{user.firstName}</span>
              </div>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
                className="mobile-signout"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </motion.nav>
    </header>
  );
};

export default Header;