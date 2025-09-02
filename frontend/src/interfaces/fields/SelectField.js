import React from 'react';

function SelectField({ label, value, onChange, name, options = [], placeholder }) {
  return (
    <label className="fld">
      <span className="fld__label">{label}</span>
      <select className="fld__input" name={name} value={value} onChange={(e) => onChange(e.target.value)}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}

export default SelectField;

