// src/components/FileThumbnail.jsx
import React from 'react';

const FileShow = ({ record }) => {
  const filePath = record.params.path;  // Assuming the file path is stored in the 'path' property
  const fileExtension = filePath.split('.').pop().toLowerCase();
  const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
  //const isImage = false;

  const imageUrl = `/public${filePath}`;

  return (
    <div style={{ textAlign: 'left' }}>
      {isImage ? (
        <img
          src={imageUrl}
          alt={record.params.filename}
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
        />
      ) : (
        <div style={{ width: '150px', height: '150px', backgroundColor: '#f0f0f0', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span>{fileExtension.toUpperCase()}</span>
        </div>
      )}
    </div>
  );
};

export default FileShow;
