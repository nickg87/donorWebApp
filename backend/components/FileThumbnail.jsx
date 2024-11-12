// src/components/FileThumbnail.jsx
import React, {useEffect, useState} from 'react';

const FileThumbnail = ({ record }) => {
  const [filePath, setFilePath] = useState(record?.params?.path);
  const [isLoading, setIsLoading] = useState(filePath === undefined);

  useEffect(() => {
    if (!filePath || isLoading) {
      const timeoutId = setTimeout(() => {
        setFilePath(record?.params?.path);  // Attempt to get the path again after timeout
        setIsLoading(false);
      }, 100); // Set timeout to 1 second (1000 ms) or adjust as needed

      return () => clearTimeout(timeoutId); // Clean up on unmount
    }
  }, [filePath, record, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '8px' }}
        />
      ) : (
        <div style={{ width: '150px', height: '150px', backgroundColor: '#f0f0f0', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span>{fileExtension.toUpperCase()}</span>
        </div>
      )}
    </div>
  );
};

export default FileThumbnail;
