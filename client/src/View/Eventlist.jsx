import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../View/Review.css';

const Eventlist = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleWriteClick = () => {
    navigate('/Newswrite');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <div className="container-123">
        <div className="qwer">Eventlist</div>
        <div className="search-123">
          <input type="text" placeholder="Search" />
        </div>
        <table>
          <thead>
            <tr className="table-header">
              <th className="title-header">제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.event_id}>
                <td className="title">
                  <Link to={`/Newsevent/${event.event_id}`}>{event.title}</Link>
                </td>
                <td className="author">관리자</td>
                <td className="date">{formatDate(event.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-123">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button className="active">7</button>
        </div>
        <div className="write-btn">
          <button onClick={handleWriteClick}>글쓰기</button>
        </div>
      </div>
    </div>
  );
};

export default Eventlist;
