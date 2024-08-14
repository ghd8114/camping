import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ReservationPayment.css";
import PaymentModal from "../UI/PaymentModal";
import "../UI/PaymentModal.css";
import {
  fetchProductDetails,
  fetchOptions,
  fetchPaymentDetails,
} from "../service/ApiService";
import { format } from "date-fns";

export default function ReservationPayment() {
  const location = useLocation();
  const { productName } = useParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [peopleCount, setPeopleCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservedDates, setReservedDates] = useState([]);

  const openModal = () => {
    if (!startDate || !endDate) {
      alert("예약 날짜를 선택해 주세요.");
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePaymentSuccess = () => {
    closeModal();
    navigate("/payment-success"); // 결제 성공 후 리디렉션할 경로
  };

  const parseDateString = (dateStr) => {
    if (!dateStr) {
      console.error("Invalid date string:", dateStr);
      return new Date(NaN); // Invalid Date
    }
  
    // 정규식 패턴을 사용하여 날짜와 시간 부분을 추출합니다.
    const regex = /^(\d{4})\. (\d{1,2})\. (\d{1,2})\. (오전|오후) (\d{1,2}):(\d{2}):(\d{2})$/;
    const match = dateStr.match(regex);
    
    if (!match) {
      console.error("Date string is malformed:", dateStr);
      return new Date(NaN); // Invalid Date
    }
  
    const [, year, month, day, period, hour, minute, second] = match;
  
    console.log("Date Part:", { year, month, day });
    console.log("Time Part:", { hour, minute, second, period });
  
    // 시간 조정
    let adjustedHour = parseInt(hour, 10);
    if (period === "오후" && adjustedHour !== 12) {
      adjustedHour += 12;
    } else if (period === "오전" && adjustedHour === 12) {
      adjustedHour = 0;
    }
  
    // ISO 8601 형식으로 변환
    const isoDateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(adjustedHour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}Z`;
    console.log("ISO Date String:", isoDateStr);
  
    const date = new Date(isoDateStr);
  
    // 날짜 객체가 유효한지 확인합니다.
    if (isNaN(date.getTime())) {
      console.error("Invalid date format:", isoDateStr);
      return new Date(NaN); // Invalid Date
    }
  
    return date;
  };

  useEffect(() => {
    setLoading(true);

    fetchProductDetails(productName)
      .then((data) => {
        if (data) {
          setProductDetails(data);
          setSelectedImage(data.mainImageUrl || "");
          setPeopleCount(1);
        } else {
          console.error("Product details are undefined");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });

    fetchOptions()
      .then((data) => {
        console.log("Fetched Options:", data);
        setOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching Options:", error);
      });

    fetchPaymentDetails(productName)
      .then((data) => {
        console.log("Fetched Payment Details:", data);

        const allReservedDates = [];

        data.forEach((reservation) => {
          if (!reservation || !reservation.reservationDate) {
            console.error("Missing or invalid reservationDate:", reservation);
            return;
          }

          console.log("Reservation Data:", reservation);

          const [startDateStr, endDateStr] = reservation.reservationDate.split("-").map(str => str.trim());

          if (!startDateStr || !endDateStr) {
            console.error("Reservation date string is malformed:", reservation.reservationDate);
            return;
          }

          const startDate = parseDateString(startDateStr);
          const endDate = parseDateString(endDateStr);

          if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.error("Invalid date format:", { startDateStr, endDateStr });
            return;
          }

          allReservedDates.push({ startDate, endDate });
        });

        console.log("All Reserved Dates:", allReservedDates);
        setReservedDates(allReservedDates);
      })
      .catch((error) => {
        console.error("Error fetching payment details:", error);
      });

  }, [productName]);

  // const isDateReserved = (date) => {
  //   return reservedDates.some((reservedDate) => {
  //     const start = new Date(reservedDate.startDate);
  //     const end = new Date(reservedDate.endDate);
  //     end.setDate(end.getDate() ); // 예약 종료일의 다음 날까지 비활성화
  
  //     return date >= start && date < end;
  //   });
  // };

  const isDateRangeReserved = (start, end) => {
    return reservedDates.some(({ startDate, endDate }) => {
      const reservedStart = new Date(startDate);
      const reservedEnd = new Date(endDate);
      reservedEnd.setDate(reservedEnd.getDate()); // 예약 종료일의 다음 날까지 비활성화

      return (start < reservedEnd && end > reservedStart);
    });
  };

  const filterDate = (date) => {
    return !reservedDates.some(({ startDate, endDate }) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      start.setDate(start.getDate() - 1);
      end.setDate(end.getDate()); // 예약 종료일의 다음 날까지 비활성화
  
      return date >= start && date < end;
    });
  };

  const selectImage = (image) => {
    setSelectedImage(image);
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    if (start && end && isDateRangeReserved(start, end)) {
      alert("예약이된 날짜가 포함되어있습니다. 다른 날짜를 선택해 주세요.");
      setStartDate(null);
      setEndDate(null);
      return;
    }
    setStartDate(start);
    setEndDate(end);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    };
    return new Date(date).toLocaleDateString("ko-KR", options);
  };

  console.log(startDate, endDate);

  const handleOptionChange = (e) => {
    const optionName = e.target.value;
    if (optionName) {
      setSelectedOptions((prevOptions) => {
        const newOptions = { ...prevOptions };
        if (newOptions[optionName]) {
          newOptions[optionName].count += 1;
        } else {
          const option = options.find(
            (option) => option.optionName === optionName
          );
          if (option) {
            newOptions[optionName] = {
              count: 1,
              price: option.optionPrice,
            };
          }
        }
        return newOptions;
      });
    }
  };

  const increaseCount = (optionName) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = { ...prevOptions };
      if (newOptions[optionName]) {
        newOptions[optionName].count += 1;
      }
      return newOptions;
    });
  };

  const decreaseCount = (optionName) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = { ...prevOptions };
      if (newOptions[optionName] && newOptions[optionName].count > 1) {
        newOptions[optionName].count -= 1;
      } else {
        delete newOptions[optionName];
      }
      return newOptions;
    });
  };

  const calculateNights = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInTime = end.getTime() - start.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      return differenceInDays;
    }
    return 0;
  };

  const nights = calculateNights();
  const productPrice = productDetails?.price || 0;
  const totalProductPrice = productPrice * nights;

  const totalPrice = Object.keys(selectedOptions).reduce((acc, optionName) => {
    const { count, price } = selectedOptions[optionName];
    return acc + count * price;
  }, totalProductPrice);

  const handlePeopleCountChange = (change) => {
    setPeopleCount((prevCount) => {
      const maxPeople = productDetails?.maxPeople || Infinity;
      const newCount = prevCount + change;
      return Math.min(Math.max(newCount, 1), maxPeople);
    });
  };

  if (loading) return <div>Loading...</div>;

  if (!productDetails) {
    return <div>Product details not available.</div>;
  }

  console.log(reservedDates);

  return (
    <>
      <div className="rp-body">
        <div className="rp-left-section">
          <div className="rp-image-section">
            <div className="rp-main-image">
              <img src={selectedImage} alt="Selected" />
            </div>
            <div className="rp-sub-images">
              <img
                src={`${productDetails.mainImageUrl}`}
                alt="Thumbnail 1"
                onClick={() => selectImage(productDetails.mainImageUrl)}
              />
              <img
                src={`${productDetails.subImageUrl}`}
                alt="Thumbnail 2"
                onClick={() => selectImage(productDetails.subImageUrl)}
              />
              <img
                src={`${productDetails.subImageUrl2}`}
                alt="Thumbnail 3"
                onClick={() => selectImage(productDetails.subImageUrl2)}
              />
              <img
                src={`${productDetails.subImageUrl3}`}
                alt="Thumbnail 4"
                onClick={() => selectImage(productDetails.subImageUrl3)}
              />
            </div>
          </div>
          <div className="rp-description-section">
            <div>
              <h4>객실 구성</h4>
              <ul>
                <li>
                  <p>야외테크 + 전용주차장</p>
                </li>
              </ul>
            </div>
            <div>
              <h4>기준 인원</h4>
              <ul>
                <li>
                  <p>최대 인원은 영유아 포함입니다</p>
                </li>
                <li>
                  <p>최대 인원 초과 시 예약이 불가합니다</p>
                </li>
              </ul>
            </div>
            <div>
              <h4>입실 시간</h4>
              <ul>
                <li>
                  <p>
                    체크인 <span>15:00</span>
                  </p>
                </li>
                <li>
                  <p>
                    체크아웃 <span>11:00</span>
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <h4>구비 시설</h4>
              <p>
                킹 사이즈 베드 1, 싱글베드 2, TV, 쇼파, 테이블, 블루투스 스피커,
                커피포트, 냉장고
                <br />
                인덕션(1구), 전자레인지, 드라이어기,
                욕실용품(샴푸&린스&바디워시), 야외주방
              </p>
            </div>
            <h4 className="rp-red-h4">야외 수영장은 자유롭게 이용하실 수 있습니다</h4>
          </div>
        </div>
        <div className="rp-right-section">
          <div className="rp-date-reservation">
            <h2>{productName}</h2>
            <div className="rp-date">
              <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                minDate={new Date()}
                dateFormat="yyyy/MM/dd"
                filterDate={filterDate}
                excludeDates={reservedDates} // 예약된 날짜 비활성화
                placeholderText="예약 시작 날짜를 선택하세요"
              />
            </div>
          </div>
          {nights > 0 && (
            <div className="rp-price">
              <p>
                {nights}박 {formatDate(startDate)} ~ {formatDate(endDate)}{" "}
                <span>{totalProductPrice.toLocaleString()}원</span>
              </p>
              <div className="rp-person">
                <button onClick={() => handlePeopleCountChange(-1)}>-</button>
                <span>{peopleCount}명</span>
                <button onClick={() => handlePeopleCountChange(1)}>+</button>
              </div>
            </div>
          )}
          {options.length > 0 && ( // Add this condition to render options-related sections
            <div className="rp-option-description">
              <div className="rp-option">
                <h5>불멍 세트</h5>
                <img src={options[0]?.optionPic} alt="" />
                <ul>
                  <li>
                    <p>불멍을 더욱 편리하게 이용하실 수 있습니다.</p>
                  </li>
                  <li>
                    <p>
                      푸른들 전용화로 + 장작 1망(10kg) + 착화탄 +
                      매직파이어(오로라가루) + 마시멜로우
                    </p>
                  </li>
                  <li>
                    <p>
                      체크인 시, 웰컴 센터에서 이용시간을 말씀해주시기
                      바랍니다(16:00 ~ 20:00 내 이용)
                    </p>
                  </li>
                  <li>
                    <p>장작은 함수율에 따라 g수가 상이할 수 있습니다</p>
                  </li>
                </ul>
              </div>
              <div className="rp-option">
                <h5>숯불 세트</h5>
                <img src={options[1]?.optionPic} alt="" />
                <ul>
                  <li>
                    <p>바베큐 이용 시 필수 입니다</p>
                  </li>
                  <li>
                    <p>푸른들 전용화로 + 숯 1봉 + 착화탄 + 그릴</p>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <div className="rp-option-choice">
            <select name="option" onChange={handleOptionChange}>
              <option value="">옵션 선택</option>
              {options.map((option) => (
                <option key={option.optionId} value={option.optionName}>
                  {option.optionName}
                </option>
              ))}
            </select>
            {Object.keys(selectedOptions).length > 0 && (
              <div className="rp-options-select">
                {Object.keys(selectedOptions).map(
                  (optionName) =>
                    selectedOptions[optionName].count > 0 && (
                      <div key={optionName} className="rp-selected">
                        <h6>{optionName}</h6>
                        <p>
                          <div>
                          <button onClick={() => decreaseCount(optionName)}>
                            -
                          </button>
                          <label className="rp-selected-option-count">
                          {selectedOptions[optionName].count || 0}개
                          </label>
                          <button onClick={() => increaseCount(optionName)}>
                            +
                          </button>
                          <span>
                            {(selectedOptions[optionName].count || 0) *
                              (selectedOptions[optionName].price || 0)}
                            원
                          </span>
                          </div>
                        </p>
                      </div>
                    )
                )}
                <p className="rp-total-price">
                  총 가격: {totalPrice.toLocaleString()}원
                </p>
              </div>
            )}
          </div>
          <div>
            <button
              className="rp-button"
              onClick={() =>
                openModal({
                  productName,
                  startDate,
                  endDate,
                  selectedOptions,
                  peopleCount,
                  totalPrice,
                })
              }
            >
              예약하기
            </button>
            <PaymentModal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              productDetails={productDetails}
              productName={productName}
              startDate={startDate}
              endDate={endDate}
              selectedOptions={selectedOptions}
              peopleCount={peopleCount}
              totalPrice={totalPrice}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>
        </div>
      </div>
    </>
  );
}
