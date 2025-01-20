import React from 'react';
import classes from './InputWrapper.module.scss';
import ButtonWrapper from "@/components/UI/ButtonWrapper";

const InputWrapper = ({ id, name, type, theme, placeholder, value, required, readOnly, disabled, icon, onChange, extra }) => {
  let rounded = "rounded-full";
  if (icon) {
    rounded = "rounded-full rounded-r-none";
  }
  return (
    <div className="mt-1 flex items-center">
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        readOnly={readOnly}
        onChange={onChange}
        disabled={disabled}
        className={`
                px-3 py-2 ${rounded} ${classes.inputWrapperStyle} ${classes[theme]} w-full
                ${classes[theme]} 
                ${extra}
                `}/>
      {icon && <div className={`${classes.gradientOutline} rounded-full rounded-l-none`}><div className={`px-2 py-2 rounded-full rounded-l-none focus:outline-none ${classes.copyToClipboard}`}>{icon}</div></div>}
    </div>


  );
};

export default InputWrapper;
