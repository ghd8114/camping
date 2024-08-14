import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Reviewwrite from '../View/Reviewwrite';
import Detailreview from '../View/Detailreview';
import Reviewlist from '../View/Reviewlist';
import { ReviewProvider } from './ReviewContext';

const ReviewContainer = () => {
  return (
    <ReviewProvider>
      <Routes>
        <Route path="/Reviewwrite" element={<Reviewwrite />} />
        <Route path="/Detailreview/:index" element={<Detailreview />} />
        <Route path="/Reviewlist" element={<Reviewlist />} />
      </Routes>
    </ReviewProvider>
  );
};

export default ReviewContainer;
