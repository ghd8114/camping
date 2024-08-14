import React, { useState,useEffect } from 'react';
import './Community.css'; // CSS 파일 가져오기

const Community = () => {

    const [hasScrolled1, setHasScrolled1] = useState(false);
    const [hasScrolledRevers, setHasScrolledRevers] = useState(false);
    const [hasScrolled2, setHasScrolled2] = useState(false);
  
    useEffect(() => {
      // 핸들러 1
      const handleScroll1 = () => {
        if (!hasScrolled1) {
          const scrollPosition = window.scrollY;
          const textDiva = document.querySelector('#text_div');
          const photoa = document.querySelector('#photo img');
  
          if (scrollPosition >1400) {
            textDiva.classList.add('slide-right');
            photoa.classList.add('slide-left');
            setHasScrolled1(true);
            window.removeEventListener('scroll', handleScroll1);
          }
        }
      };
  
      // 핸들러 2
      const handleScrollRevers = () => {
        if (!hasScrolledRevers) {
          const scrollPosition = window.scrollY;
          const textDivRevers = document.querySelector('.text_div_revers');
          const photoRevers = document.querySelector('#photo_revers img');
  
          if (scrollPosition > 1400) {
            textDivRevers.classList.add('slide-left_revers');
            photoRevers.classList.add('slide-right_revers');
            setHasScrolledRevers(true);
            window.removeEventListener('scroll', handleScrollRevers);
          }
        }
      };
  
      // 핸들러 3
      const handleScroll2 = () => {
        if (!hasScrolled2) {
          const scrollPosition = window.scrollY;
          const textDiva = document.querySelector('#text_div1');
          const photoa = document.querySelector('#photo1 img');
  
          if (scrollPosition > 2400) {
            textDiva.classList.add('slide-right');
            photoa.classList.add('slide-left');
            setHasScrolled2(true);
            window.removeEventListener('scroll', handleScroll2);
          }
        }
      };
  
      // 이벤트 리스너 등록
      window.addEventListener('scroll', handleScroll1);
      window.addEventListener('scroll', handleScrollRevers);
      window.addEventListener('scroll', handleScroll2);
  
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => {
        window.removeEventListener('scroll', handleScroll1);
        window.removeEventListener('scroll', handleScrollRevers);
        window.removeEventListener('scroll', handleScroll2);
      };
    }, [hasScrolled1, hasScrolledRevers, hasScrolled2]); // 상태 변수를 의존성 배열에 포함
  

  return (

    <div className='Community'>

      <div className="section_grid">
    <div className="main_grid" id="main_grid">
        <p className="photo" id="photo">
     <img src='./img/aaa4.jpg' alt=''/>
    </p>
    <div class="text_div" id="text_div">
     <h1 class="text_h">매점</h1>
     <p class="text_p">캠핑 도구 및 식료품을 구매가능한 매점</p>
    </div>
  </div>
</div>

<div  class="section_grid">
  <div className="main_grid" id="main_grid_revers">
    <p className="photo" id="photo_revers">
    <img  src="./img/aaa2.jpg" alt=''/>
    </p>
    <div className="text_div_revers" id="text_div_revers">
     <h1 className="text_h" id="text_h_revers" > 수영장</h1>
     <p className="text_p" id="text_p_revers"> 더위를 날려줄 수영장</p>
    </div>
    </div>
</div>

<div  className="section_grid">
    <div className="main_grid" id="main_grid1">
    <p className="photo" id="photo1">
    <img src="./img/aaa5.jpg" alt=''/>
    </p>
    <div className="text_div" id="text_div1">
     <h1 className="text_h"> 샤워장</h1>
     <p className="text_p">깔끔한 샤워시설 오전 8시 ~ 10시 오후 8시 ~ 10시</p>
    </div>
    </div>
</div>
    </div>
  );
};

export default Community;
