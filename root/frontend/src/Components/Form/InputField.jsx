export default function InputField({
  label,
  type = 'text',
  placeholder,
  hasError = false,
  errorMessage = '',
  ...props
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="font-roboto text-gray-12 text-sm font-normal mb-2">
        {label}
      </label>
      <input
        className={`rounded-sm border p-3 font-roboto text-gray-11 text-sm font-normal focus:outline-indigo-07
          ${hasError ? 'border-red-500 bg-red-50' : 'border-gray-06 bg-gray-02'}
        `}
        type={type}
        placeholder={placeholder}
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
