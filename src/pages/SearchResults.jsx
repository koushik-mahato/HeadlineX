import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useFetchNews from '../hooks/useFetchNews';
import ArticleCard from '../components/ArticleCard';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('publishedAt'); // default sort
  const pageSize = 12;

  const { articles, totalResults, loading, error } = useFetchNews({
    type: 'everything', // tells hook to use /v2/everything
    q: searchQuery,
    sortBy,
    page,
    pageSize,
  });

  const totalPages = Math.ceil(totalResults / pageSize);

  useEffect(() => {
    setPage(1); // reset to page 1 if query changes
  }, [searchQuery]);

  return (
    <main className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-sky-300">
          Search results for: "<span className="italic">{searchQuery}</span>"
        </h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-2 py-1 bg-slate-800 text-slate-200 border border-slate-600 rounded"
        >
          <option value="publishedAt">🕒 Newest</option>
          <option value="popularity">📈 Popularity</option>
          <option value="relevancy">🔍 Relevance</option>
        </select>
      </div>

      {loading && <p className="text-slate-400">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && articles.length === 0 && (
        <p className="text-slate-400">No articles found.</p>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {articles.map((a, idx) => (
          <ArticleCard key={a.url || idx} article={a} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-50"
          >
            ◀ Prev
          </button>

          <span className="text-slate-300">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages}
            className="px-4 py-2 rounded bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-50"
          >
            Next ▶
          </button>
        </div>
      )}
    </main>
  );
};

export default SearchResults;
