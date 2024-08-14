import React, { useState, useContext } from 'react';
import { ReviewContext } from '../Component/ReviewContext';
import { useNavigate } from 'react-router-dom';
import '../View/Review.css';

const Reviewwrite = () => {
  const { addReview } = useContext(ReviewContext);
  const navigate = useNavigate();
  const [review_head, setReviewHead] = useState(''); // 제목
  const [review_content, setReviewContent] = useState(''); // 내용
  const [file, setFile] = useState(null);

  const handleFileClick = () => {
    document.getElementById('file').click();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toISOString().split('T')[0]; // 날짜를 YYYY-MM-DD 형식으로 변환

    const newReview = {
      review_head,
      review_content,
      file_path: file ? file.name : '',
      date,
      author: '작성자명',
      view_count: 0,
      comments: []
    };

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      fetch('http://localhost:8080/api/files/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(filePath => {
          newReview.file_path = filePath;
          return fetch('http://localhost:8080/api/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReview),
          });
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(savedReview => {
          addReview(savedReview);
          navigate('/Reviewlist');
        })
        .catch(error => console.error('Error:', error));
    } else {
      fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(savedReview => {
          addReview(savedReview);
          navigate('/Reviewlist');
        })
        .catch(error => console.error('Error:', error));
    }
  };

  return (
    <div>
      <div className="container-123">
        <div className="qwer">리뷰 게시글 작성</div>
        <form onSubmit={handleSubmit} className='rw-form'> 
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              value={review_head}
              onChange={(e) => setReviewHead(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              name="content"
              rows="10"
              value={review_content}
              onChange={(e) => setReviewContent(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="file">파일 첨부</label>
            <input
              type="file"
              id="file"
              name="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <input
              type="text"
              id="file-info"
              name="file-info"
              value={file ? file.name : '파일 경로가 노출됩니다.'}
              readOnly
            />
            <button type="button" onClick={handleFileClick}>
              찾아보기
            </button>
            <button type="submit">글쓰기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reviewwrite;
