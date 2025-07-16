import formatDate from "../utils/formatDate";
import truncateText from "../utils/truncateText";
import { FiBookmark } from "react-icons/fi";
import { useFavourites } from "../context/FavouritesContext";

const fallbackImage = "https://via.placeholder.com/400x200?text=No+Image";

const ArticleCard = ({ article }) => {
  const { title, description, url, urlToImage, publishedAt, source } = article;

  const { isFavourite, addToFavourites, removeFromFavourites } = useFavourites();
  const fav = isFavourite(url);

  const handleToggle = (e) => {
    e.preventDefault(); // prevent navigation on icon click
    fav ? removeFromFavourites(url) : addToFavourites(article);
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative bg-slate-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition block group"
    >
      {/* Bookmark icon */}
      <button
        onClick={handleToggle}
        className={`absolute top-2 right-2 z-10 p-1 rounded-full text-sm bg-slate-700/80 backdrop-blur hover:bg-slate-600 transition text-sky-300 ${
          fav ? "text-yellow-400" : "text-sky-300"
        }`}
        title={fav ? "Remove from Favourites" : "Save to Favourites"}
      >
        <FiBookmark className={`w-5 h-5 ${fav && "fill-current"}`} />
      </button>

      <img
        src={urlToImage || fallbackImage}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-sky-300">
          {truncateText(title, 80)}
        </h3>
        <p className="text-sm text-slate-400">
          {truncateText(description, 100)}
        </p>
        <div className="text-xs text-slate-500 mt-2 flex justify-between">
          <span>{source?.name}</span>
          <span>{formatDate(publishedAt)}</span>
        </div>
      </div>
    </a>
  );
};

export default ArticleCard;
