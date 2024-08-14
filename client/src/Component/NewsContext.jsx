import React, { createContext, useState } from 'react';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);

  const addNews = (newsItem) => {
    setNews([...news, newsItem]);
  };

  return (
    <NewsContext.Provider value={{ news, addNews }}>
      {children}
    </NewsContext.Provider>
  );
};
