import React, { useState,useEffect } from 'react';
import './Camping.css'; // CSS 파일 가져오기


const CampingA = () => {

  // 상태 설정: 스크롤이 처리되었는지 여부를 추적합니다.
  const [hasScrolled, setHasScrolled] = useState(false);
  
  useEffect(() => {
    // 스크롤 이벤트 핸들러
    const handleScrollCamping_div1A = () => {
      if (!hasScrolled) {  // 한 번만 실행되도록 상태를 확인합니다.
        const scrollPosition = window.scrollY;
        const textDivCampingDivA = document.querySelector('#camping_div1');
        
        if (scrollPosition > 1600) {
          textDivCampingDivA.classList.add('slide-up1');
          
          // 상태 업데이트: 스크롤이 처리되었음을 표시합니다.
          setHasScrolled(true);

          // 이벤트 리스너 제거
          window.removeEventListener('scroll', handleScrollCamping_div1A);
        }
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScrollCamping_div1A);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScrollCamping_div1A);
    };
  }, [hasScrolled]); // 상태 변수를 의존성 배열에 포함시킵니다.

    
    return(
      
        <section className='camping_section' id="camping_A">
        
            <h1 className='camping_A_h'>글램핑 A / 2 ~ 4 인</h1>
            <div className="camping_A">
                <img className="camping_A_1" src='./img/camping1.jpg'/>
                <img className="camping_A_3" src="./img/camping1-1.PNG"/>
                <img className="camping_A_2" id="camping_A_3" src="./img/camping1-2.png"/>
            </div>

            <div className="div_camping"  id="camping_div1">
        <div className="camping_div">
        <h2 className="camping_h1" id="campimg_h">구조</h2>
        <p className="camping_p1" id="campimg_p">야외 바베큐장, 화장실</p>
        </div>
        <div className="camping_div">
        <h2 className="camping_h1" id="campimg_h">구비시설</h2>
        <p className="camping_p1" id="campimg_p">취사도구,에어컨, 침대 퀸 1, 식탁, 세면도구, 수건 4 </p>
    </div>
    <div className="camping_div">
    <h2 className="camping_h1" id="campimg_h">특이사항</h2>
        <p className="camping_p1" id="campimg_p">
            수영장 이용시간 
            <br/>
            12 PM ~ 6 PM <br/>
           바베큐 이용시간<br/>
            4 PM ~ 10 PM
        </p>
    </div>
    <div className="camping_div">
        <h2 className="camping_h1" id="campimg_h">주의사항</h2>
        <p className="camping_p1" id="campimg_p">
            실내 흡연 및 실내 화기 사용금지 <br/>
            파손, 냄새가 많이나는 음식조리 <br/>
            12시 이후 고상방가 및 마이크로 인한 피해 발생 시 숙청
        </p>
    </div>
            </div>
        </section>
     
        
    )
}
export default CampingA;