import React from 'react';
import LogoIcon from '../../Assets/LogoIcon.svg?react';

const BlockMobilePage = () => {
  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center text-center p-4">
      <LogoIcon />
      <h1 className="text-xl text-red-600 font-semibold">
        Esta página está disponível apenas para dispositivos desktop.
      </h1>
    </div>
  );
};

export default BlockMobilePage;
