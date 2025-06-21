import { Question } from '@phosphor-icons/react';
import { useState } from 'react';

export default function InputField({
  label,
  type = 'text',
  placeholder,
  hasError = false,
  errorMessage = '',
  required = false,
  tooltip = '',
  value = '',
  onChange,
  ...props
}) {
  const isPhone = label?.toLowerCase().includes('telefone');
  const isBirthDate = label?.toLowerCase().includes('data');
  const max = props.max ?? null;
  const min = props.min ?? null;

  const handleChange = (e) => {
    let newValue = e.target.value;

    if (isPhone) {
      newValue = formatPhone(newValue);
    } else if (isBirthDate) {
      newValue = formatDate(newValue);
    }

    if (type === 'number' && newValue) {
      const num = parseInt(newValue, 10);
      if (max !== null && num > max) newValue = String(max);
      if (min !== null && num < min) newValue = String(min);
    }

    if (onChange) {
      onChange({
        target: {
          name: props.name,
          value: newValue,
        },
      });
    }
  };

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
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        className={`rounded-sm border p-3 font-roboto text-gray-11 text-sm font-normal focus:outline-indigo-07
          ${
            hasError ? 'border-red-500 bg-red-50' : 'border-gray-06 bg-gray-02'
          }`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        max={props.max}
        min={props.min}
        {...props}
      />
      {hasError && (
        <p className="text-xs text-red-500 mt-1">
          {errorMessage || 'Campo obrigatório'}
        </p>
      )}
    </div>
  );
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '');

  if (digits.length <= 2) {
    return `(${digits}`;
  } else if (digits.length <= 3) {
    return `(${digits.slice(0, 2)}) ${digits[2]}`;
  } else if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits[2]} ${digits.slice(3)}`;
  } else if (digits.length <= 11) {
    return `(${digits.slice(0, 2)}) ${digits[2]} ${digits.slice(
      3,
      7
    )}-${digits.slice(7)}`;
  } else {
    return `(${digits.slice(0, 2)}) ${digits[2]} ${digits.slice(
      3,
      7
    )}-${digits.slice(7, 11)}`;
  }
}

function formatDate(value) {
  const digits = value.replace(/\D/g, '');

  if (digits.length <= 2) {
    return digits;
  } else if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  } else if (digits.length <= 8) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  } else {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
  }
}
