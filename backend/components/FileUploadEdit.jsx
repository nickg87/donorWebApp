import React, {useState} from 'react';

const FileUploadEdit = ({ record, onChange, property, showNotification }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

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
  // Handle file upload
  const handleGetTest = async (event) => {
    event.preventDefault(); // Prevent form submission until upload is complete
    try {
      const response = await fetch('/api/files', {
        method: 'GET'
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error('Test GET Method  failed.');
      }
    } catch (error) {
      console.error('Test GET Method  failed.');
    }
  };

  // Handle file upload
  const handlePostTest = async (event) => {
    event.preventDefault(); // Prevent form submission until upload is complete

    const formData = new FormData();
    formData.append('testy', '1');
    files.forEach((file) => formData.append('file', file));

    try {
      const response = await fetch('/api/files/test', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error('Test POST Method  failed.');
      }
    } catch (error) {
      console.error('Test POST Method  failed.');
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
    <div>
      {uploadedFiles.length === 0 ? (
          <>
            <input
              type="file"
              name="file"
              multiple
              disabled={isUploading}
              onChange={handleFileChange}
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button onClick={handleUpload} disabled={files.length === 0}>
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
            {/*<button onClick={handleGetTest} >*/}
            {/*  Test GET*/}
            {/*</button>*/}
          </>) : (
        <div>
          <h2>Images were uploaded and saved!</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {uploadedFiles.map((file, index) => (
              <div key={index} style={{ width: '150px', textAlign: 'center' }}>
                <img
                  src={file.path}
                  alt={file.filename}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
                <p>{file.filename}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px' }}>
            <button onClick={handleGoBack} style={{ marginRight: '10px' }}>
              Go back to List
            </button>
            <button onClick={handleUploadOtherImages}>Upload other images</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadEdit;
