import React, { useState } from 'react';
import { Button, Label, Box, RichTextEditor } from '@adminjs/design-system';

// Define the component for multilingual short editing
const ShortEdit = ({ record, onChange }) => {
  const [currentLang, setCurrentLang] = useState('en');

  // Extract short from the nested params property using dot notation
  const initialShort = {
    en: record.params['short.en'] || '',
    es: record.params['short.es'] || ''
  };

  const [short, setShort] = useState(initialShort);

  // console.log('short:');
  // console.log(short);

  // Function to handle language tab changes
  const handleLangChange = (lang) => {
    setCurrentLang(lang);
  };

  // Function to handle rich text changes
  const handleTextChange = (value, lang) => {
    const updatedShort = {
      ...short,
      [lang]: value,
    };
    setShort(updatedShort); // Update local state

    onChange({
      ...record,
      params: {
        ...record.params,
        short: updatedShort, // Update the correct field
      },
    });
  };

  return (
    <div className="adminjs-short-edit"> {/* Custom class for styling */}
      <Box mb="lg" className="adminjs-short-edit__tabs">
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
        <div className="adminjs-short-edit__input">
          <Label htmlFor={'short_' + currentLang}>{`Short (${currentLang}):`}</Label>
          {currentLang === 'en' && <RichTextEditor
            id={'short_en'}
            value={short.en || ''}
            onChange={(e) => handleTextChange( e, currentLang)}
            style={{ width: '100%'}}
          />}
          {currentLang === 'es' && <RichTextEditor
            id={'short_es'}
            value={short.es || ''}
            onChange={(e) => handleTextChange( e, currentLang)}
            style={{ width: '100%'}}
          /> }
        </div>
      </Box>
    </div>
  );
};

export default ShortEdit;
