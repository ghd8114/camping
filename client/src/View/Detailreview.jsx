import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../View/Review.css';

const Detailreview = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      const response = await fetch(`http://localhost:8080/api/reviews/${id}`);
      const data = await response.json();
      data.date = formatDate(data.date);
      setReview(data);
    };

    fetchReview();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleAddComment = async () => {
    if (!newComment || newRating === 0) return;

    const response = await fetch(`http://localhost:8080/api/reviews/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: newComment,
        rating: newRating,
      }),
    });

    const data = await response.json();
    setReview((prevReview) => ({
      ...prevReview,
      comments: [...prevReview.comments, data],
    }));
    setNewComment('');
    setNewRating(0);
  };

  const handleRatingChange = (rating) => {
    setNewRating(rating);
  };

  if (!review) return <div>리뷰가 없습니다.</div>;

  return (
    <div>
      <div className="container-123">
        <div className="qwer">review</div>
        <div className="content-header">
          <h2 className='NewsEvent-h2'>{review.review_head}</h2>
        </div>
        <div className="content">
          <div className="post-info">
            <span>{review.date}</span>
            <span>조회수 {review.view_count} ♡</span>
          </div>
          {review.file_path && (
            <div className="post-image">
              <img src={`http://localhost:8080${review.file_path}`} alt="attached file" onError={(e) => e.target.style.display = 'none'} />
            </div>
          )}
          <p className="post-content">{review.review_content}</p>
        </div>
        <div className="comments">
          <h3>댓글</h3>
          {review.comments.length > 0 ? review.comments.map((comment, index) => (
            <div className="comment" key={index}>
              <p>
                <strong>댓글 작성자명</strong> {'★'.repeat(comment.rating)}{'★'.repeat(5 - comment.rating).replace(/★/g, '☆')}
              </p>
              <p>{comment.text}</p>
            </div>
          )) : <p>댓글이 없습니다.</p>}
        </div>
        <div className="write-comment">
          <input
            type="text"
            placeholder="리뷰댓글"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={newRating >= star ? 'star selected' : 'star'}
                onClick={() => handleRatingChange(star)}
              >
                {newRating >= star ? '★' : '☆'}
              </span>
            ))}
          </div>
          <button className="back-button" onClick={() => navigate('/Reviewlist')}>목록</button>
          <button className="add-button" onClick={handleAddComment}>글쓰기</button>
          <button onClick={() => navigate(`/Editreview/${review.review_id}`)}>게시글수정</button>
        </div>
      </div>
    </div>
  );
};

export default Detailreview;
