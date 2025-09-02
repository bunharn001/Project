import React from 'react';

function CheckboxGroup({ label, value = [], onChange, name, options = [] }) {
  const toggle = (opt) => {
    const exists = value.includes(opt);
    const next = exists ? value.filter((v) => v !== opt) : [...value, opt];
    onChange(next);
  };
  return (
    <fieldset className="fld">
      <legend className="fld__label">{label}</legend>
      <div className="fld__group">
        {options.map((opt) => (
          <label key={opt} className="chk">
            <input type="checkbox" checked={value.includes(opt)} onChange={() => toggle(opt)} />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default CheckboxGroup;

