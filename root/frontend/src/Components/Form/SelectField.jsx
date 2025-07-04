import React from 'react';
import { CaretDown, Question } from '@phosphor-icons/react';

function SelectField({
  label,
  options = [],
  hasError = false,
  errorMessage = '',
  required = false,
  tooltip = '',
  ...props
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="font-roboto text-gray-12 text-sm font-normal mb-2 flex items-center gap-1">
        {label}
        {tooltip && (
          <div className="relative group inline-block">
            <span className="text-gray-11 cursor-pointer text-base leading-none">
              <Question size={16} />
            </span>
            <div className="absolute z-10 hidden group-hover:block bg-gray-04/90 text-gray-12 text-xs px-3 py-2 border border-gray-06 rounded shadow-md w-64 top-full left-1/2 transform -translate-x-1/2 mt-1">
              {tooltip}
            </div>
          </div>
        )}
        {required && <span className="text-red-09 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          className={`appearance-none w-full rounded-sm border p-3 pr-10 font-roboto text-gray-11 text-sm font-normal focus:outline-indigo-07
            ${
              hasError ? 'border-red-09 bg-red-03' : 'border-gray-06 bg-gray-02'
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
        <p className="text-xs text-red-09 mt-1">
          {errorMessage || 'Campo obrigatório'}
        </p>
      )}
    </div>
  );
}

export default SelectField;
