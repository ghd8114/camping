import React, { createContext, useState, useEffect } from 'react';

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/reviews')
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const addReview = (review) => {
    setReviews([...reviews, review]);
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, setReviews }}>
      {children}
    </ReviewContext.Provider>
  );
};
