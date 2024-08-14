import React from 'react';
import { useLocation } from 'react-router-dom';
import "./PaymentComplete.css";

export default function PaymentComplete() {
  const location = useLocation();
  const { paymentPerson, paymentData } = location.state;

  return (
    <div className="paymentcomplete-body">
      <div className="body-body">
        <div className="payment-complete-text">
          <h2>예약이 <span>완료</span>되었습니다</h2>
          <img src="" alt="" />
        </div>

        <div className="payment-complete-info">
          <h3>예약자 정보 </h3>
          <ul>
            <li>
              <p>예약자 성함</p>
              <span>{paymentPerson.name}</span>
            </li>
            <li>
              <p>전화번호</p>
              <span>{paymentPerson.phone}</span>
            </li>
            <li>
              <p>이메일</p>
              <span>{paymentPerson.email}</span>
            </li>
          </ul>
        </div>

        <div className="payment-complete-info">
          <h3>
            결제상품 정보 
          </h3>
          <span>예약번호: {paymentData[0].reservationNumber}</span>
          <ul>
            <li><p>결제 날짜</p><span>{new Date(paymentData[0].orderDate).toLocaleString()}</span></li>
            <li><p>예약 날짜</p><span>{paymentData[0].reservationDate}</span></li>
            <li><p>상품명</p><span>{paymentData[0].productName}</span></li>
            <li><p>옵션</p><span>{paymentData.map(data => data.optionName).join(', ')}</span></li>
            <li><p>옵션 가격</p><span>{paymentData.map(data => data.optionPrice).join(', ')}</span></li>
            <li><p>인원 수</p><span>{paymentData[0].personNumber}</span></li>
            <li><p>총 가격</p><span>{paymentData[0].paymentPrice.toLocaleString()}원</span></li>
          </ul>
        </div>
      </div>
      <div className="pc-button-div">
        <button className='pc-button'>홈 화면으로 가기</button>
        <button className='pc-button'>결제화면으로 가기</button>
      </div>
    </div>
  );
}
