import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../View/Review.css';

const Newswrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState('');

  const handleFileClick = () => {
    document.getElementById('file').click();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedFilePath = '';

    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const fileResponse = await fetch('http://localhost:8080/api/files/upload', {
          method: 'POST',
          body: formData,
        });

        if (!fileResponse.ok) {
          throw new Error('File upload response was not ok');
        }

        uploadedFilePath = await fileResponse.text();
        setFilePath(uploadedFilePath); // 파일 경로를 상태로 저장
      }

      let formattedDate = '';
      if (date) {
        const dateObj = new Date(date);
        if (!isNaN(dateObj.getTime())) {
          formattedDate = dateObj.toISOString().split('T')[0];
        }
      }

      const newEvent = {
        title,
        description,
        date: formattedDate,
        manager_id: 'default_manager',
        type: 'default_type',
        content: 'default_content',
        file_path: uploadedFilePath,
      };

      console.log('Submitting event with file_path:', newEvent);

      const response = await fetch('http://localhost:8080/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      navigate('/Eventlist');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="container-123">
        <div className="qwer">이벤트/공지사항 게시글 작성</div>
        <form onSubmit={handleSubmit} className='rw-form'>
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
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
              required
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
              required
            />
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
          </div>
          {filePath && (
            <div className="form-group">
              <label>이미지 미리보기</label>
              <img src={`http://localhost:8080${filePath}`} alt="Preview" style={{ maxWidth: '100%' }} />
            </div>
          )}
          <button type="submit">글쓰기</button>
        </form>
      </div>
    </div>
  );
};

export default Newswrite;
