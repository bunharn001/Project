import React from 'react';

function TextField({ label, value, onChange, name, type = 'text', placeholder, required }) {
  return (
    <label className="fld">
      <span className="fld__label">{label}{required ? ' *' : ''}</span>
      <input
        className="fld__input"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default TextField;

