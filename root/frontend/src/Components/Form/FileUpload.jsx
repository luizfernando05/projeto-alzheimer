import { useState, useId } from 'react';
import { UploadSimple } from '@phosphor-icons/react';

export default function FileUpload({
  label = 'Upload de arquivo',
  accept = '',
  formatsText = '',
  onFileChange,
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
        className="flex items-center gap-2 rounded-sm border border-gray-06 bg-gray-02 p-3 cursor-pointer hover:bg-gray-03 transition font-roboto text-gray-11 text-sm font-normal"
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
    </div>
  );
}
