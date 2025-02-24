import { useContext, useEffect, useState } from 'react';
import { userAuthorContextObj } from '../../contexts/UserAuthorContext';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, BookOpen, Edit, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
// import handwriting from "../../assets/handwriting.jpg"
// import  book from "../../assets/bookspects.jpg"
import blog1 from '../../assets/1.jpg';
import blog2 from '../../assets/2.jpg';
import blog3 from '../../assets/3.jpg';
import bg from '../../assets/bg.jpg';
// import heroBgLight from '../../assets/hero-bg-light.jpg';
// import heroBgDark from '../../assets/hero-bg-dark.jpg';
// import quoteBgLight from '../../assets/hero-bg-light.jpg';
// import quoteBgDark from '../../assets/hero-bg-dark.jpg';
import './Home.css'
import "tailwindcss"
import { useDarkMode } from '../../contexts/DarkModeContext';
import { toast } from 'react-hot-toast';

function Home() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const { isSignedIn, user, isLoaded } = useUser();
  const [error, setError] = useState("");
  const [isDark] = useDarkMode();
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark-mode');
  };

  useEffect(() => {
    if (isSignedIn === true) {
      setCurrentUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl,
      });
    }
  }, [isLoaded]);

  async function onSelectRole(e) {
    // console.log("Role selected:", e.target.value); // Debug log
    setError('');
    const selectedRole = e.target.value;
    
    try {
      // First, update the currentUser object with the selected role
      const updatedUser = {
        ...currentUser,
        role: selectedRole
      };

      // console.log("Sending request to:", `${BACKEND_URL}/${selectedRole}-api/${selectedRole}`); // Debug log
      
      const res = await axios.post(
        `${BACKEND_URL}/${selectedRole}-api/${selectedRole}`, 
        updatedUser
      );

      // console.log("Response:", res.data); // Debug log

      if (res.data.message === selectedRole) {
        // Show success toast
        toast.success(`Successfully signed in as ${selectedRole}`);
        
        // Update context and localStorage
        setCurrentUser(res.data.payload);
        localStorage.setItem("currentuser", JSON.stringify(res.data.payload));
        
        // Navigate based on role
        switch(selectedRole) {
          case 'user':
            navigate(`/user-profile/${updatedUser.email}`);
            break;
          case 'author':
            navigate(`/author-profile/${updatedUser.email}`);
            break;
          case 'admin':
            navigate(`/admin-profile/${updatedUser.email}`);
            break;
        }
      } else {
        // Show error toast for backend error message
        toast.error(res.data.message);
        setError(res.data.message);
      }
    } catch (err) {
      // Show error toast for any caught errors
      toast.error(err.response?.data?.message || 'Something went wrong');
      setError(err.response?.data?.message || err.message);
    }
  }

  const blogPosts = [
    {
      id: 1,
      image: blog1,
      title: "The Art of Storytelling",
      excerpt: "Explore the craft of weaving compelling narratives that captivate readers."
    },
    {
      id: 2,
      image: blog2,
      title: "Digital Age Writing",
      excerpt: "How modern technology is reshaping the way we create and consume content."
    },
    {
      id: 3,
      image: blog3,
      title: "Creative Expression",
      excerpt: "Share your unique perspective and join our community of writers."
    }
  ];

  function loginmsg(){
    toast.error("Login to read Blogs!")
  }

  const GuestHome = () => (
    <div className="home-container">
      <section className="hero-section">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-content"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#EAEAEA]">
            Welcome to InkFlow
          </h1>
          <p className="text-xl text-[#EAEAEA] max-w-2xl mx-auto">
            Discover stories that inspire, educate, and entertain
          </p>
        </motion.div>
      </section>

      <motion.div 
        className="blog-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {blogPosts.map((post, index) => (
          <motion.div 
            key={post.id}
            className="blog-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="blog-content">
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <button className="read-more" onClick={loginmsg}>Read More</button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );

  const AuthenticatedHome = () => (
    <div className="authenticated-home">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="role-container"
      >
        <h1 className="role-title">Choose Your Role</h1>
        <p className="role-subtitle">
          Select how you want to interact with our community
        </p>

        <div className="role-grid">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="role-card"
            onClick={() => {
              console.log("Reader card clicked"); // Debug log
              onSelectRole({ target: { value: 'user' }});
            }}
          >
            <div className="role-icon-wrapper">
              <BookOpen className="role-icon" />
            </div>
            <h3 className="role-name">Reader</h3>
            <p className="role-description">
              Explore and enjoy articles from our talented authors
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="role-card"
            onClick={() => {
              console.log("Author card clicked"); // Debug log
              onSelectRole({ target: { value: 'author' }});
            }}
          >
            <div className="role-icon-wrapper">
              <Edit className="role-icon" />
            </div>
            <h3 className="role-name">Author</h3>
            <p className="role-description">
              Share your knowledge and creativity with the world
            </p>
          </motion.div>

          {/* <motion.div
            whileHover={{ scale: 1.05 }}
            className="role-card"
            onClick={() => {
              console.log("Admin card clicked"); // Debug log
              onSelectRole({ target: { value: 'admin' }});
            }}
          >
            <div className="role-icon-wrapper">
              <Shield className="role-icon" />
            </div>
            <h3 className="role-name">Admin</h3>
            <p className="role-description">
              Manage users, content, and platform settings
            </p>
          </motion.div> */}
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </motion.div>
    </div>
  );
  

  return (
    <main className="relative">
      {/* <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors"
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-yellow-500" />
        ) : (
          <Moon className="w-6 h-6 text-gray-700" />
        )}
      </button> */}

      {isSignedIn ? (
        <AuthenticatedHome />
      ) : (
        <GuestHome />
      )}
    </main>
  );
}

export default Home;