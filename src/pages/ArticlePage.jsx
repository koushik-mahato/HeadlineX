import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiArrowLeft, FiBookmark } from 'react-icons/fi';
import useFetchNews from '../hooks/useFetchNews';
import { useFavourites } from '../context/FavouritesContext';

const ArticlePage = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(state?.article || null);
  const { articles, loading } = useFetchNews({ country: 'in', language: 'en' });

  const { addToFavourites, removeFromFavourites, isFavourite } = useFavourites();
  const fav = article && isFavourite(article.url);

  useEffect(() => {
    if (!article && articles.length) {
      const match = articles.find(
        (a) => a.article_id === id || encodeURIComponent(a.title) === id
      );
      setArticle(match || null);
    }
  }, [articles, article, id]);

  if (loading && !article)
    return <p className="p-6 text-slate-300">Loading article...</p>;

  if (!article)
    return (
      <div className="p-6 text-slate-300">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sky-400 hover:underline flex items-center gap-2"
        >
          <FiArrowLeft /> Back
        </button>
        <p>Article not found.</p>
      </div>
    );

  const { title, image_url, pubDate, source_id, description, content, link, url } =
    article;

  return (
    <main className="p-6 max-w-3xl mx-auto text-slate-100">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sky-400 hover:underline flex items-center gap-2"
      >
        <FiArrowLeft /> Back
      </button>

      <h1 className="text-2xl sm:text-3xl font-semibold text-sky-300 mb-3">
        {title}
      </h1>

      <div className="text-sm text-slate-400 mb-4 flex gap-4 flex-wrap">
        <span>{source_id || 'Unknown Source'}</span>
        <span>{new Date(pubDate).toLocaleDateString()}</span>
      </div>

      {image_url && (
        <img
          src={image_url}
          alt={title}
          className="w-full h-60 sm:h-80 object-cover rounded mb-6"
        />
      )}

      <p className="text-base leading-relaxed mb-6">
        {content || description || 'No additional content available.'}
      </p>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sky-400 hover:underline text-sm mb-4"
        >
          View Original Article ↗
        </a>
      )}

      <button
        onClick={() =>
          fav ? removeFromFavourites(url) : addToFavourites(article)
        }
        className={`text-sm flex items-center gap-1 transition ${
          fav
            ? 'text-red-400 hover:text-red-300'
            : 'text-sky-400 hover:text-sky-300'
        }`}
      >
        <FiBookmark /> {fav ? 'Remove from Favourites' : 'Save to Favourites'}
      </button>
    </main>
  );
};

export default ArticlePage;
