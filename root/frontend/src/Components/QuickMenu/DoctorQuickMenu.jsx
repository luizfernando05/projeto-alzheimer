import { CaretUp, X } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';

const DoctorQuickMenu = ({ scrollRef }) => {
  const [visible, setVisible] = useState(true);
  const [mainWidth, setMainWidth] = useState(null);

  useEffect(() => {
    const scrollEl = scrollRef?.current;
    if (!scrollEl) return;

    const updateMenuWidth = () => {
      const width = scrollEl.getBoundingClientRect().width;
      setMainWidth(width);
    };

    const handleScroll = () => {
      if (!visible) return;
      const scrollPosition = scrollEl.scrollTop + scrollEl.clientHeight;
      const totalHeight = scrollEl.scrollHeight;
      const threshold = totalHeight * (2 / 3);
      const shouldHide = scrollPosition >= threshold;
      if (shouldHide) setVisible(false);
    };

    scrollEl.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateMenuWidth);
    updateMenuWidth();

    return () => {
      scrollEl.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateMenuWidth);
    };
  }, [scrollRef, visible]);

  return (
    <>
      {!visible && (
        <button
          className="fixed bottom-6 right-6 bg-gray-01/70 text-gray-12 p-3 shadow-lg z-50 hover:bg-gray-03/80 transition-all flex gap-4 items-center rounded-2xl border border-gray-06 font-roboto font-normal text-sm"
          onClick={() => setVisible(true)}
        >
          Abrir Menu
          <CaretUp size={16} />
        </button>
      )}

      <div
        className={`fixed bottom-0 z-40 pb-4 transition-transform duration-500 ease-in-out ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          left: '50%',
          transform: `translateX(-50%) ${visible ? '' : ' translateY(100%)'}`,
          width: mainWidth ? `${mainWidth - 64}px` : '90%',
          maxWidth: '100%',
        }}
      >
        <div className="relative bg-gray-01 border border-gray-06 rounded-xl shadow-lg p-4 flex flex-wrap gap-3 justify-center items-center">
          <button
            className="absolute top-2 right-2 text-gray-12 hover:text-gray-11"
            onClick={() => setVisible(false)}
          >
            <X size={20} />
          </button>
          <p className="font-poppins font-normal text-base text-gray-12">
            Menu rápido
          </p>
          <QuickMenuItem label="Dashboard" />
          <QuickMenuItem label="Listar pacientes" />
          <QuickMenuItem label="Relatório de predições" />
          <QuickMenuItem label="Relatório de positivos" />
          <QuickMenuItem label="Relatório de pacientes" />
        </div>
      </div>
    </>
  );
};

const QuickMenuItem = ({ label }) => {
  return (
    <button className="bg-gray-02 hover:bg-gray-03 text-sm text-gray-12 px-4 py-2 rounded-md transition border border-gray-06">
      {label}
    </button>
  );
};

export default DoctorQuickMenu;
