import React, { useState } from 'react';
import { Button, Input, Label, Box } from '@adminjs/design-system';

// Define the component for multilingual title editing
const TitleEdit = ({ record, onChange }) => {
  console.log('record:');
  console.log(record);
  const [currentLang, setCurrentLang] = useState('en');

  // Extract title from the nested params property
  const initialTitle = ((record.params && record.params.title) || record.title) || {};
  // console.log('initialTitle:');
  // console.log(initialTitle);
  const [title, setTitle] = useState(initialTitle);

  // Function to handle language tab changes
  const handleLangChange = (lang) => {
    setCurrentLang(lang);
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { value } = event.target;
    const updatedTitle = {
      ...title,
      [currentLang]: value,
    };
    setTitle(updatedTitle); // Update local state
    onChange({
      ...record,
      params: {
        ...record.params,
        title: updatedTitle,
      },
    });
  };

  return (
    <div className="adminjs-title-edit"> {/* Custom class for styling */}
      <Box mb="lg" className="adminjs-title-edit__tabs">
        <Button
          className={currentLang === 'en' ? 'active' : ''}
          style={{ backgroundColor: currentLang === 'en' ? '#ECEEFB' : '#fff'}}
          onClick={(event) => { event.preventDefault(); handleLangChange('en'); }}
        >
          English
        </Button>
        <Button
          className={currentLang === 'es' ? 'active' : ''}
          style={{ backgroundColor: currentLang === 'es' ? '#ECEEFB' : '#fff'}}
          onClick={(event) => { event.preventDefault(); handleLangChange('es'); }}
        >
          Spanish
        </Button>
      </Box>
      <Box mb="lg">
        <div className="adminjs-title-edit__input">
          <Label htmlFor="title">{`Title (${currentLang}):`}</Label>
          <Input
            type="text"
            id="title"
            value={title[currentLang] || ''}
            onChange={handleInputChange}
            style={{ width: '100%'}}
          />
        </div>
      </Box>
    </div>
  );
};

export default TitleEdit;
