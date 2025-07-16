import { createContext, useContext, useState } from 'react';

const NewsFilterContext = createContext();

export const NewsFilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    country: '',
    language: '',
    category: '',
    userHasFiltered: false,
  });

  return (
    <NewsFilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </NewsFilterContext.Provider>
  );
};

export const useNewsFilters = () => {
  const context = useContext(NewsFilterContext);
  if (!context) {
    throw new Error('useNewsFilters must be used inside NewsFilterProvider');
  }
  return context;
};
