import React, { useState } from 'react';
import axios from 'axios';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.message);
      setImageUrl(`http://localhost:3000${res.data.filePath}`);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="file" accept=".jpeg, .jpg, .png" onChange={onFileChange} />
        <input type='text' placeholder='Content' />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded file" style={{ maxWidth: '100%', height: 'auto' }} />}
    </div>
  );
};

export default FileUpload;
