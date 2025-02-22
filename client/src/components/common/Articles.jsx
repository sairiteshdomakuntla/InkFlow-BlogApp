import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { Book, Clock, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import './Articles.css';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchArticles = async (category = '') => {
    try {
      setLoading(true);
      setError('');
      
      const token = await getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const url = category
        ? `${BACKEND_URL}/author-api/articles/filter/${category}`
        : `${BACKEND_URL}/author-api/articles`;

      const response = await axios.get(url, { headers });
      
      if (response.data?.payload) {
        // Ensure authorData exists for each article
        const processedArticles = response.data.payload.map(article => ({
          ...article,
          authorData: article.authorData || {
            nameOfAuthor: 'Anonymous',
            profileImageUrl: '' // Add a default image URL if needed
          }
        }));
        setArticles(processedArticles);
      } else {
        setArticles([]);
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = (article) => {
    navigate(`/article/${article.articleId}`, { state: article });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="articles-page">
        <div className="articles-container">
          <div className="loading-state">Loading articles...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="articles-page">
        <div className="articles-container">
          <div className="error-state">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="articles-page">
      <div className="articles-container">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="articles-header"
        >
          <div className="header-title">
            <Book className="text-[#FF3131] w-8 h-8" />
            <h1 className="text-2xl font-bold text-[#EAEAEA]">Articles</h1>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              fetchArticles(e.target.value === 'All Categories' ? '' : e.target.value);
            }}
            className="category-select"
          >
            <option>All Categories</option>
            <option>Technology</option>
            <option>Science</option>
            <option>Health</option>
            <option>Business</option>
          </select>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="articles-grid"
        >
          {articles.map((article, index) => (
            <motion.article
              key={article.articleId || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="article-card"
              onClick={() => handleArticleClick(article)}
            >
              <div className="article-content">
                <div className="article-meta">
                  <span className="author-avatar">
                    {article.authorData?.nameOfAuthor?.charAt(0) || 'A'}
                  </span>
                  <div className="meta-info">
                    <span className="author-name">
                      {article.authorData?.nameOfAuthor || 'Anonymous'}
                    </span>
                    <span className="article-date">
                      <Clock className="inline w-4 h-4" />
                      {new Date(article.dateOfCreation).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <h2 className="article-title">{article.title}</h2>
                <p className="article-text">
                  {article.content?.substring(0, 150)}...
                </p>
                
                <div className="article-footer">
                  <span className="category-tag">
                    <Tag className="inline w-4 h-4" />
                    {article.category}
                  </span>
                  <button className="read-more">
                    Read More →
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Articles;