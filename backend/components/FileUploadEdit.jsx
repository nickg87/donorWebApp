import React, {useEffect, useState} from 'react';
import { fetchIsLocal } from '../utils/miscellaneous'; // Import the helper function

const FileUploadEdit = ({ record, onChange, property, showNotification }) => {
  const [isLocal, setIsLocal] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Fetch the environment variable from the server using the helper function
  useEffect(() => {
    const getIsLocal = async () => {
      const isLocalValue = await fetchIsLocal();
      setIsLocal(isLocalValue);
    };

    getIsLocal();
  }, []);

  if (isLocal === null) {
    return <div>Loading...</div>;
  }

  // Allowed file types and max size
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const maxSize = 2 * 1024 * 1024; // 2MB in bytes

  // Handle file change
  const handleFileChange = (event) => {
    console.log(event.target);
    const newFiles = Array.from(event.target.files);
    setError(''); // Clear previous errors

    // Validate files
    const validFiles = [];
    newFiles.forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        setError('Invalid file type. Only .jpeg, .jpg, and .png are allowed.');
      } else if (file.size > maxSize) {
        setError('File size should be smaller than 2MB.');
      } else {
        validFiles.push(file);
      }
    });

    // Update state with valid files
    setFiles(validFiles);
  };

  // Handle file upload
  const handleUpload = async (event) => {
    event.preventDefault(); // Prevent form submission until upload is complete
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => formData.append('file', file));
    setIsUploading(true);  // Disable the button until upload completes

    // Debugging: Log each entry in the FormData
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        const { files: uploadedFilesData } = result;

        // Set the uploaded files for display
        setUploadedFiles(uploadedFilesData);

        //onChange(property, files);  // Send the file paths to AdminJS

        if (showNotification) {
          showNotification('Files uploaded successfully', { type: 'success' });
        } else {
          console.log('Files uploaded successfully.');
        }
      } else {
        if (showNotification) {
          showNotification('File upload failed', { type: 'error' });
        } else {
          console.error('File upload failed.');
        }
      }
    } catch (error) {
      if (showNotification) {
        showNotification('File upload failed', { type: 'error' });
      } else {
        console.error('File upload failed.');
      }
    } finally {
      setIsUploading(false); // Re-enable the form after upload
    }
  };

  // Handle "Go back to List" action
  const handleGoBack = () => {
    window.location.href = `/admin/resources/files`;
  };

  // Handle "Upload other images" action
  const handleUploadOtherImages = () => {
    setUploadedFiles([]);  // Reset uploaded files to allow new upload
    setFiles([]);           // Reset selected files
    setError('');           // Clear error message
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {uploadedFiles.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: 'auto' }}>
          <input
            type="file"
            name="file"
            multiple
            disabled={isUploading}
            onChange={handleFileChange}
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}
          />
          {error && <div style={{ color: 'red', fontSize: '0.9em' }}>{error}</div>}
          <button
            onClick={handleUpload}
            disabled={files.length === 0 || isUploading}
            style={{
              padding: '10px 15px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: isUploading ? 'not-allowed' : 'pointer',
            }}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2>Images were uploaded and saved!</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
            {uploadedFiles.map((file, index) => (
              <div key={index} style={{ width: '150px', textAlign: 'center' }}>
                <img
                  src={(isLocal ? '/public' : '') + file.path}
                  alt={file.filename}
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                />
                <p style={{ fontSize: '0.9em', wordWrap: 'break-word' }}>{file.filename}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button onClick={handleGoBack} style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#f8f9fa', cursor: 'pointer' }}>
              Go back to List
            </button>
            <button onClick={handleUploadOtherImages} style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>
              Upload other images
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadEdit;
