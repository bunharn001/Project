import React from 'react';

function SwitchField({ label, checked, onChange, name }) {
  return (
    <label className="fld fld--switch">
      <span className="fld__label">{label}</span>
      <input type="checkbox" name={name} checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}

export default SwitchField;

