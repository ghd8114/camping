import React from 'react';
import Gallery from '../Component/Gallery';
import CampingA from '../Component/CampingA';
import CampingB from '../Component/CampingB';
import CaravanA from '../Component/CaravanA';
import CampingNav from '../Component/CampingNav';

import './CampingAll.css'; // CSS 파일 가져오기


const CampingRoom = () => {

  return (
  <div>
  
    <Gallery/>
    <CampingA/>
    <CampingB/>
    <CaravanA/>
    <CampingNav/>
  
      </div>
  );
};

export default CampingRoom;
