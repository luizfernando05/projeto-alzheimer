import React from 'react';
import DoctorLayout from './DoctorLayout';
import { ArrowLeft } from '@phosphor-icons/react';

const DoctorProfile = () => {
  return (
    <DoctorLayout>
      <section className="w-full">
        <div className="bg-gray-01 rounded-xl shadow-sm border border-gray-06">
          <div className="bg-gray-01 rounded-xl shadow-sm border border-gray-06">
            <div className="flex gap-6 pt-6 pb-6 pr-8 pl-8 border-b border-gray-06">
              <button className="flex items-center gap-2 text-xs text-gray-11 hover:text-gray-12 shadow-xs rounded-sm border border-gray-06 bg-gray-02 hover:bg-gray-03">
                <div className="pr-2 pl-2 pt-1 pb-1 border-r border-gray-06">
                  <ArrowLeft size={16} />
                </div>
                <span className="pr-2 pl-2 pt-1 pb-1">Voltar</span>
              </button>

              <h2 className="text-xl font-poppins font-normal text-gray-12">
                Meu Perfil
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3"></div>
          </div>
        </div>
      </section>
    </DoctorLayout>
  );
};

export default DoctorProfile;
