import React, { useRef } from 'react';

const FileInput = ({setSelectedFile}) => {
  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    fileInputRef.current.click();    
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // You can now handle the selected file as needed
    console.log('Selected file:', file);
  };

  return (
    <div
      className="file-input-div"
      onClick={handleDivClick}
    >
      <p>Click anywhere in this box to select a file.</p>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".xlsx"
      />
    </div>
  );
};

export default FileInput;
