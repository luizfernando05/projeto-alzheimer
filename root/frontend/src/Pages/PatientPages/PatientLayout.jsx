import React, { useRef } from 'react';
import PatientHeader from '../../Components/Header/PatientHeader';

const PatientLayout = ({ children }) => {
  const mainRef = useRef(null);

  return (
    <div className="flex h-screen w-screen">
      <div className="flex-1 flex flex-col">
        <PatientHeader />
        <main
          ref={mainRef}
          className="relative flex-1 px-8 py-6 bg-gray-02 overflow-y-auto"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
