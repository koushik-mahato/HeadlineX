import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNewsFilters } from '../context/NewsFilterContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { filters, setFilters } = useNewsFilters();
  const { category } = filters;

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [showCategories, setShowCategories] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('https://newsapi.org/v2/sources', {
          params: { apiKey: import.meta.env.VITE_NEWS_API_KEY },
        });

        const sources = data.sources || [];
        const uniqueCategories = [...new Set(sources.map((s) => s.category))].sort();
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (cat) => {
    setFilters({
      category: cat,
      userHasFiltered: true,
    });
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      userHasFiltered: false,
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-slate-900 text-slate-100 shadow-lg transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-sky-400">Explore</h2>
          <button
            onClick={onClose}
            className="text-xl p-1 rounded hover:bg-slate-800 transition"
            aria-label="Close sidebar"
          >
            <FiX />
          </button>
        </div>

        <nav className="p-4 space-y-6 text-sm">
          {/* Nav Links */}
          <div className="space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-2 py-1 border-l-4 transition-all duration-200 ${
                  isActive
                    ? 'border-sky-400 text-sky-400 font-medium bg-slate-800'
                    : 'border-transparent hover:text-sky-300 hover:border-slate-600'
                }`
              }
            >
              🏠 Home
            </NavLink>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                `block px-2 py-1 border-l-4 transition-all duration-200 ${
                  isActive
                    ? 'border-sky-400 text-sky-400 font-medium bg-slate-800'
                    : 'border-transparent hover:text-sky-300 hover:border-slate-600'
                }`
              }
            >
              🔖 Favourites
            </NavLink>
          </div>

          {/* Category Filters */}
          <div className="space-y-4 border-t border-slate-700 pt-4">
            <div>
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="w-full flex justify-between items-center font-semibold"
              >
                📂 Categories <span>{showCategories ? '▲' : '▼'}</span>
              </button>
              {showCategories &&
                (loadingCategories ? (
                  <p className="ml-3 mt-2 text-slate-500 text-sm">Loading...</p>
                ) : (
                  <div className="ml-3 mt-2 space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`block w-full text-left px-2 py-1 border-l-4 transition-all duration-200 ${
                          category === cat
                            ? 'border-sky-400 text-sky-400 font-medium bg-slate-800'
                            : 'border-transparent hover:text-sky-300 hover:border-slate-600'
                        }`}
                      >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </button>
                    ))}
                  </div>
                ))}
            </div>
          </div>

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            className="w-full mt-6 text-left px-3 py-2 bg-slate-800 text-red-400 hover:text-red-300 rounded"
          >
            🔄 Reset Filters
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
