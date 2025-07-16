import { useState } from 'react';
import { useNewsFilters } from '../context/NewsFilterContext';
import useFetchNews from '../hooks/useFetchNews';
import ArticleCard from '../components/ArticleCard';

const Home = () => {
  const { filters } = useNewsFilters();
  const { category, userHasFiltered } = filters;

  const [page, setPage] = useState(1);
  const pageSize = 12;

  const query = userHasFiltered
    ? { category, page, pageSize }
    : { country: 'us', page, pageSize };

  const { articles, totalResults, loading, error } = useFetchNews(query);

  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <main className="p-6 max-w-7xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-sky-300">
        {userHasFiltered ? 'Filtered News' : 'Top Global Headlines'}
      </h2>

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

      {/* Pagination Controls */}
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

export default Home;
