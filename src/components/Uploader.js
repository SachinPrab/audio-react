import React from 'react';

const Uploader = ({ handleUpload }) => {
  return (
    <div>
      <input type="file" accept="audio/, video/, image/*" onChange={handleUpload} />
    </div>
  );
};

export default Uploader;
