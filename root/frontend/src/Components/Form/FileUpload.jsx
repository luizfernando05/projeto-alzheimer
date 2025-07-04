import { useState, useId } from 'react';
import { UploadSimple } from '@phosphor-icons/react';

export default function FileUpload({
  label = 'Upload de arquivo',
  accept = '',
  formatsText = '',
  onFileChange,
  hasError = false,
  errorMessage = '',
}) {
  const [fileName, setFileName] = useState('');
  const id = useId();

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileChange?.(file);
    } else {
      setFileName('');
      onFileChange?.(null);
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor={id}
        className="font-roboto text-gray-12 text-sm font-normal mb-2"
      >
        {label}
      </label>

      <label
        htmlFor={id}
        className={`flex items-center gap-2 rounded-sm border p-3 cursor-pointer transition font-roboto text-gray-11 text-sm font-normal
          ${
            hasError
              ? 'border-red-09 bg-red-03 hover:bg-red-04'
              : 'border-gray-06 bg-gray-02 hover:bg-gray-03'
          }
        `}
      >
        <UploadSimple size={16} />
        {fileName || formatsText}
      </label>

      <input
        id={id}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />

      {hasError && (
        <p className="text-xs text-red-09 mt-1">
          {errorMessage || 'Campo obrigatório'}
        </p>
      )}
    </div>
  );
}
