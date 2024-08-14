import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../View/Review.css';

const NewsEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/events/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          data.date = formatDate(data.date);
          setNewsItem(data);
        })
        .catch(error => setError(error.message));
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (error) return <div>오류 발생: {error}</div>;
  if (!newsItem) return <div>뉴스가 없습니다.</div>;

  const handleEditClick = () => {
    navigate(`/EditNewsevent/${id}`); // 수정 페이지로 이동
  };

  return (
    <div>
      <div className="container-123">
        <div className="qwer">news/event</div>
        <div className="content-header">
          <h2 className='NewsEvent-h2'>{newsItem.title}</h2>
        </div>
        <div className="content">
          <p className="event-info">{newsItem.date} 조회수 999 ♡</p>
          {newsItem.file_path && (
            <div className="event-image">
              <img src={`http://localhost:8080${newsItem.file_path}`} alt="attached file" onError={(e) => e.target.style.display = 'none'} />
            </div>
          )}
          <div className="event-details">
            <p>{newsItem.description}</p>
          </div>
        </div>
        <div className="write-btn">
          <button onClick={handleEditClick}>수정하기</button>
          <button onClick={() => navigate('/Newswrite')}>글쓰기</button>
        </div>
      </div>
    </div>
  );
};

export default NewsEvent;
