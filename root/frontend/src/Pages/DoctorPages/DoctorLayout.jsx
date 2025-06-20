import React, { useRef } from 'react';
import DoctorHeader from '../../Components/Header/DoctorHeader';
import DoctorQuickMenu from '../../Components/QuickMenu/DoctorQuickMenu';
import DoctorSidebar from '../../Components/Sidebar/DoctorSidebar';

const DoctorLayout = ({ children }) => {
  const mainRef = useRef(null);

  return (
    <div className="flex h-screen w-screen">
      <DoctorSidebar />
      <div className="flex-1 flex flex-col">
        <DoctorHeader />
        <main
          ref={mainRef}
          className="relative flex-1 px-8 py-6 bg-gray-02 overflow-y-auto"
        >
          {children}
          <DoctorQuickMenu scrollRef={mainRef} />
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
