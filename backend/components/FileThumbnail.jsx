// src/components/FileThumbnail.jsx
import React, {useEffect, useState} from 'react';
import { fetchIsLocal } from '../utils/miscellaneous'; // Import the helper function


const FileThumbnail = ({ record }) => {
  const [isLocal, setIsLocal] = useState(null);
  const [filePath, setFilePath] = useState(record?.params?.path);
  const [isLoading, setIsLoading] = useState(filePath === undefined);

  // Fetch the environment variable from the server using the helper function
  useEffect(() => {
    const getIsLocal = async () => {
      const isLocalValue = await fetchIsLocal();
      setIsLocal(isLocalValue);
    };

    getIsLocal();
  }, []);

  if (isLoading || isLocal === null) {
    return <div>Loading...</div>;
  }

  const fileExtension = filePath.split('.').pop().toLowerCase();
  const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
  //const isImage = false;
  const imageUrl = `${isLocal ? '/public' : ''}${filePath}`;

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
