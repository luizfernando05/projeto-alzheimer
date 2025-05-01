import React from 'react';

function SelectField({ label, options = [], ...props }) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="font-roboto text-gray-12 text-sm font-normal mb-2">
        {label}
      </label>
      <select
        className="rounded-sm border border-gray-06 bg-gray-02 p-3 pr-10 font-roboto text-gray-11 text-sm font-normal focus:outline-indigo-07"
        {...props}
      >
        <option value="">Selecione uma opção</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
