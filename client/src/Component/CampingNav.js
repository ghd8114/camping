import React, { useEffect } from 'react';
import './CampingNav.css'; // CSS 파일 가져오기

const YourComponent = () => {
  // 부드러운 이동 애니메이션 효과 구현
  const animationMove = (selector) => {
    const targetEl = document.querySelector(selector);
    const browserScrollY = window.pageYOffset;
    const targetScrollY = targetEl.getBoundingClientRect().top + browserScrollY;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  // useEffect를 사용하여 컴포넌트가 마운트될 때 한 번 실행되도록 설정
  useEffect(() => {
    // 이동 시 애니메이션 효과를 적용할 모든 요소 선택
    const scrollMoveEl = document.querySelectorAll("[data-animation-scroll='true']");
    scrollMoveEl.forEach((el) => {
      // 클릭 이벤트 리스너 추가
      el.addEventListener('click', (e) => {
        const target = el.dataset.target; // data-target 속성값 가져오기
        animationMove(target); // 애니메이션 함수 호출
      });
    });

    // useEffect의 clean-up 함수에서 이벤트 리스너 제거
    return () => {
      scrollMoveEl.forEach((el) => {
        el.removeEventListener('click', () => {});
      });
    };
  }, []); // 빈 배열을 넘겨서 최초 한 번만 실행되도록 설정

  return (
    <nav className="nav_camping" id="gMenu">
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn">
        <span className="navicon"></span>
      </label>
      <ul className="menu">
        <li className="map_li">
          <img src="./img/map.PNG" alt="Map" />
        </li>
        <div className="li_camping_div">
        <li className="li_camping">
            <button
              className="button_camping"
              data-animation-scroll="true"
              data-target="#header"
            >
              main
            </button>
          </li>

          <li className="li_camping">
            <button
              className="button_camping"
              data-animation-scroll="true"
              data-target="#gallery"
            >
              Gallery
            </button>
          </li>
          <li className="li_camping">
            <button
              className="button_camping"
              data-animation-scroll="true"
              data-target="#camping_A"
            >
              Glamping A / 2 ~ 4인
            </button>
          </li>
          <li className="li_camping">
            <button
              className="button_camping"
              data-animation-scroll="true"
              data-target="#camping_B"
            >
              Glamping B / 4 ~ 6인
            </button>
          </li>
          <li className="li_camping">
            <button
              className="button_camping"
              data-animation-scroll="true"
              data-target="#caravan_A"
            >
              Caravan A / 2인 ~ 4인
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default YourComponent;
