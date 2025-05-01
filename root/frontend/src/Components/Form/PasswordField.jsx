import { useState } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';

export default function PasswordField({ label, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col space-y-1">
      <label className="font-roboto text-gray-12 text-sm font-normal mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          className="w-full rounded-sm border border-gray-06 bg-gray-02 p-3 pr-10 font-roboto text-gray-12 text-sm font-normal focus:outline-indigo-07"
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-11"
        >
          {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}
