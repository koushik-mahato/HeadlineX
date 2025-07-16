import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const useFetchNews = (params = {}) => {
  const {
    type = 'top-headlines', // 'top-headlines' or 'everything'
    page = 1,
    pageSize = 12,
    q,
    category,
    country,
    language,
    sortBy,
  } = params;

  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const endpoint =
        type === 'everything'
          ? 'https://newsapi.org/v2/everything'
          : 'https://newsapi.org/v2/top-headlines';

      try {
        const { data } = await axios.get(endpoint, {
          params: {
            apiKey: API_KEY,
            page,
            pageSize,
            q,
            category,
            country,
            language,
            sortBy,
          },
        });

        setArticles(data.articles || []);
        setTotalResults(data.totalResults || 0);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [
    type,
    q,
    category,
    country,
    language,
    sortBy,
    page,
    pageSize,
  ]);

  return { articles, totalResults, loading, error };
};

export default useFetchNews;
