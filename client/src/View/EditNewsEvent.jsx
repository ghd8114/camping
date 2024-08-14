import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../View/Review.css';

const EditNewsEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/api/events/${id}`)
      .then(response => response.json())
      .then(data => {
        setNewsItem(data);
        setTitle(data.title);
        setDescription(data.description);
        setDate(data.date);
      })
      .catch(error => console.error('Error:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEvent = {
      ...newsItem,
      title,
      description,
      date: new Date(date).toISOString().split('T')[0], // 날짜를 YYYY-MM-DD 형식으로 변환
    };

    fetch(`http://localhost:8080/api/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(`Event update failed: ${text}`) });
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      navigate(`/Newsevent/${id}`);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  if (!newsItem) return <div>뉴스가 없습니다.</div>;

  return (
    <div>
      <div className="container-123">
        <div className="qwer">이벤트/공지사항 수정</div>
        <form onSubmit={handleSubmit} className='rw-form'>
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">내용</label>
            <textarea
              id="description"
              name="description"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="date">날짜</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button type="submit">수정하기</button>
        </form>
      </div>
    </div>
  );
};

export default EditNewsEvent;
