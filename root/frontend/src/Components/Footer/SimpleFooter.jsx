import React from 'react';

export default function SimpleFooter() {
  return (
    <p className="mb-6 font-roboto text-gray-11 text-xs font-normal text-center">
      © AlzCheck, 2025.{' '}
      <a href="#" className="hover:text-indigo-12">
        Termos
      </a>
      .{' '}
      <a href="#" className="hover:text-indigo-12">
        Política de privacidade
      </a>
      .
    </p>
  );
}
