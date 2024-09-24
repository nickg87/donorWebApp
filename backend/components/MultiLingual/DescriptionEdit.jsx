import React, { useState } from 'react';
import { Button, Label, Box, RichTextEditor } from '@adminjs/design-system';

// Define the component for multilingual description editing
const DescriptionEdit = ({ record, onChange }) => {
  const [currentLang, setCurrentLang] = useState('en');

  // Extract description from the nested params property using dot notation
  const initialDescription = {
    en: record.params['description.en'] || '',
    es: record.params['description.es'] || ''
  };

  const [description, setDescription] = useState(initialDescription);

  // console.log('description:');
  // console.log(description);

  // Function to handle language tab changes
  const handleLangChange = (lang) => {
    setCurrentLang(lang);
  };

  // Function to handle rich text changes
  const handleTextChange = (value, lang) => {
    const updatedDescription = {
      ...description,
      [lang]: value,
    };
    setDescription(updatedDescription); // Update local state

    onChange({
      ...record,
      params: {
        ...record.params,
        description: updatedDescription, // Update the correct field
      },
    });
  };

  return (
    <div className="adminjs-description-edit"> {/* Custom class for styling */}
      <Box mb="lg" className="adminjs-description-edit__tabs">
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
        <div className="adminjs-description-edit__input">
          <Label htmlFor={'description_' + currentLang}>{`Description (${currentLang}):`}</Label>
          {currentLang === 'en' && <RichTextEditor
            id={'description_en'}
            value={description.en || ''}
            onChange={(e) => handleTextChange( e, currentLang)}
            style={{ width: '100%'}}
          />}
          {currentLang === 'es' && <RichTextEditor
            id={'description_es'}
            value={description.es || ''}
            onChange={(e) => handleTextChange( e, currentLang)}
            style={{ width: '100%'}}
          /> }
        </div>
      </Box>
    </div>
  );
};

export default DescriptionEdit;
