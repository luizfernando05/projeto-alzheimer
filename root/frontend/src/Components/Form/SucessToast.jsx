import { CheckCircle } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';

const SucessToast = ({ message = 'Sucesso!', duration = 4000, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let interval;
    const startTime = Date.now();

    interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = 100 - (elapsed / duration) * 100;

      if (percent <= 0) {
        clearInterval(interval);
        setProgress(0);
        onClose();
      } else {
        setProgress(percent);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] md:w-[400px] bg-gray-02/70 border border-gray-06 text-green-800 rounded-lg shadow-md overflow-hidden animate-slide-down">
      <div className="flex items-center gap-3 px-4 py-3">
        <CheckCircle size={24} className="text-green-600" />
        <span className="text-sm font-medium">{message}</span>
      </div>
      <div
        className="h-1 bg-green-500 transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default SucessToast;
