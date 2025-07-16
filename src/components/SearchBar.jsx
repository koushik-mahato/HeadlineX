import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import useDebounce from '../hooks/useDebounce';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState(() =>
    JSON.parse(localStorage.getItem('search-history')) || []
  );

  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();

  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (trimmed.length < 3) return; // NewsAPI requires 3+ characters

    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    const updated = [trimmed, ...history.filter((q) => q !== trimmed)].slice(0, 5);
    setHistory(updated);
    localStorage.setItem('search-history', JSON.stringify(updated));
  }, [debouncedQuery]);

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('search-history');
  };

  return (
    <div className="relative max-w-md w-full">
      <form className="flex items-center bg-slate-800 px-3 py-2 rounded-lg shadow-inner text-slate-300">
        <FiSearch className="text-xl mr-2" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news..."
          className="bg-transparent outline-none text-sm w-full placeholder-slate-500"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="ml-2 hover:text-red-400"
            title="Clear input"
          >
            <FiX />
          </button>
        )}
      </form>

      {history.length > 0 && !query && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-slate-700 text-sm text-slate-300 rounded shadow z-10 overflow-hidden">
          {history.map((q) => (
            <button
              key={q}
              onClick={() => setQuery(q)}
              className="w-full text-left px-4 py-2 hover:bg-slate-600"
            >
              {q}
            </button>
          ))}
          <button
            onClick={handleClearHistory}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-800 border-t border-slate-600"
          >
            Clear History
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
