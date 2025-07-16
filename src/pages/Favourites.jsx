import { useFavourites } from '../context/FavouritesContext';
import ArticleCard from '../components/ArticleCard';

const Favourites = () => {
  const { favourites } = useFavourites();

  return (
    <main className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-sky-300">Your Favourites</h1>

      {favourites.length === 0 ? (
        <p className="text-slate-400">No saved articles yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favourites.map((a) => (
            <ArticleCard key={a.url} article={a} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Favourites;
