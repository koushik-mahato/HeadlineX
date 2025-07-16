import { createContext, useContext, useEffect, useState } from 'react';

const LS_KEY = 'headlinex-favs';
const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY);
    if (stored) setFavourites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (article) => {
    if (!favourites.find((a) => a.url === article.url)) {
      setFavourites((prev) => [article, ...prev]);
    }
  };

  const removeFromFavourites = (url) => {
    setFavourites((prev) => prev.filter((a) => a.url !== url));
  };

  const isFavourite = (url) => favourites.some((a) => a.url === url);

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
