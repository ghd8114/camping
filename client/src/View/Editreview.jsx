import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReviewContext } from '../Component/ReviewContext';
import '../View/Review.css';

const Editreview = () => {
  const { id } = useParams();
  const { reviews, setReviews } = useContext(ReviewContext);
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [reviewHead, setReviewHead] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const currentReview = reviews.find((r) => r.review_id === parseInt(id, 10));
    if (currentReview) {
      setReview(currentReview);
      setReviewHead(currentReview.review_head);
      setReviewContent(currentReview.review_content);
    }
  }, [id, reviews]);

  const handleFileClick = () => {
    document.getElementById('file').click();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // 날짜를 YYYY-MM-DD 형식으로 변환

    const updatedReview = {
      ...review,
      review_head: reviewHead,
      review_content: reviewContent,
      file_path: review.file_path || '', // 기본값 설정
      date: formattedDate, // 포맷된 날짜 문자열
      user_id: review.user_id || '', // 기본값 설정
      review_num: review.review_num || 0, // 기본값 설정
      review_no: review.review_no || 0, // 기본값 설정
      author: review.author || '', // 기본값 설정
      view_count: review.view_count || 0 // 기본값 설정
    };

    console.log("Updated Review:", updatedReview); // 데이터 확인용 콘솔 출력

    const updateReview = (filePath) => {
      if (filePath) {
        updatedReview.file_path = filePath;
      }
      fetch(`http://localhost:8080/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReview),
      })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(`Review update failed: ${text}`) });
        }
        return response.json();
      })
      .then(savedReview => {
        const updatedReviews = reviews.map((r) =>
          r.review_id === savedReview.review_id ? savedReview : r
        );
        setReviews(updatedReviews);
        navigate(`/Detailreview/${id}`);
      })
      .catch(error => console.error('Error:', error.message));
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
          return response.text().then(text => { throw new Error(`File upload failed: ${text}`) });
        }
        return response.text();
      })
      .then(filePath => {
        updateReview(filePath);
      })
      .catch(error => console.error('Error:', error.message));
    } else {
      updateReview();
    }
  };

  if (!review) return <div>리뷰가 없습니다.</div>;

  return (
    <div>
      <div className="container-123">
        <div className="qwer">리뷰 게시글수정</div>
        <form onSubmit={handleSubmit} className='rw-form'>
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              value={reviewHead}
              onChange={(e) => setReviewHead(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              name="content"
              rows="10"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="file">파일첨부</label>
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
              value={file ? file.name : review.file_path || '파일 경로가 노출됩니다.'}
              readOnly
            />
            <button type="button" onClick={handleFileClick}>
              찾아보기
            </button>
            <button type="submit">수정하기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editreview;
