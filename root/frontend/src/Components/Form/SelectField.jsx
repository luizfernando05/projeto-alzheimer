import React from 'react';
import { CaretDown } from '@phosphor-icons/react';

function SelectField({
  label,
  options = [],
  hasError = false,
  errorMessage = '',
  ...props
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="font-roboto text-gray-12 text-sm font-normal mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          className={`appearance-none w-full rounded-sm border p-3 pr-10 font-roboto text-gray-11 text-sm font-normal focus:outline-indigo-07
            ${
              hasError
                ? 'border-red-500 bg-red-50'
                : 'border-gray-06 bg-gray-02'
            }
          `}
          {...props}
        >
          <option value="">Selecione uma opção</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <CaretDown
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-1 pointer-events-none"
          size={16}
        />
      </div>
      {hasError && (
        <p className="text-xs text-red-500 mt-1">
          {errorMessage || 'Campo obrigatório'}
        </p>
      )}
    </div>
  );
}

export default SelectField;
