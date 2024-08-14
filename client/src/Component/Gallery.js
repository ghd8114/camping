import React, { useState,useEffect } from 'react';
import './Gallery.css'; // CSS 파일 가져오기

const Gallery = () => {
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
      // 스크롤 이벤트 핸들러
      const handleScrollGallery = () => {
        if (!hasScrolled) {  // 한 번만 실행되도록 상태를 확인합니다.
          const scrollPosition = window.scrollY;
          const sectionGallery1 = document.querySelector('#section_img_1');
          const sectionGallery11 = document.querySelector('#section_img_1-1');
          const sectionGallery2 = document.querySelector('#section_img_2');
          const sectionGallery22 = document.querySelector('#section_img_2-1');
          if (scrollPosition > 100) {
            sectionGallery1.classList.add('slide-left');
            sectionGallery11.classList.add('slide-left');
            sectionGallery2.classList.add('slide-right');
            sectionGallery22.classList.add('slide-right');
            
            // 상태 업데이트: 스크롤이 처리되었음을 표시합니다.
            setHasScrolled(true);
  
            // 이벤트 리스너 제거
            window.removeEventListener('scroll', handleScrollGallery );
          }
        }
      };
  
      // 스크롤 이벤트 리스너 등록
      window.addEventListener('scroll', handleScrollGallery);
  
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => {
        window.removeEventListener('scroll', handleScrollGallery);
      };
    }, [hasScrolled]); // 상태 변수를 의존성 배열에 포함시킵니다.
  
    return(
        <section  id="gallery">
        <h1 className="camping_A_h" id="camping_A_h1" alt="">Gallery</h1>
        <div className="b_section_grid" id='b_section_grid'alt="">
        <img className="section_img1" id='section_img_2' src="./img/camping1.png" alt=""/>
        <img className="section_img2" src="./img/camping1-2.png" alt=""/>
        <img className="section_img3" id='section_img_1' src="./img/campimg2.jpg" alt=""/>
        <img className="section_img4" id='section_img_1-1' src="./img/car1.jpg" alt=""/>
        <img className="section_img5" id='section_img_2-1' src="./img/caravan1-1.png" alt=""/>

    </div>
    </section>
    )
}
export default Gallery;