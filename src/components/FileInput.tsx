import React from 'react';
import './FileInput.css';

interface FileInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  return (
    <div className="file-input-container">
      <label htmlFor="file-upload" className="custom-file-upload">
        <i className="bi bi-cloud-upload"></i> Choose a CSV File
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".csv"
        onChange={onChange}
        className="file-input"
      />
    </div>
  );
};

export default FileInput;
