import {
  Gear,
  HeadCircuit,
  ListNumbers,
  Microscope,
  Pencil,
  Plus,
  Sparkle,
} from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PatientSearchModal from './PatientSearchModal';

const PatientOptionsPanel = () => {
  const navigate = useNavigate();

  const [modalType, setModalType] = useState(null);

  const handleSelectPatient = (id) => {
    if (modalType === 'predict') navigate(`/doctor/predict/${id}`);
    if (modalType === 'edit') navigate(`/doctor/patient/edit/${id}`);
    if (modalType === 'exam') navigate(`/patients/${id}/medical-data`);
    setModalType(null);
  };

  return (
    <>
      <div className="bg-gray-02 rounded-lg border border-gray-06 overflow-hidden">
        <div className="flex gap-3 pt-5 pb-5 pr-6 pl-6 border-b border-gray-06">
          <div className="border border-gray-06 p-1 text-gray-12 rounded-sm">
            <Gear size={16} />
          </div>
          <h2 className="text-base font-poppins font-normal text-gray-12">
            Opções
          </h2>
        </div>
        <div className="pt-4 pb-5 pr-6 pl-6 flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/doctor/patient/create')}
            className="cursor-pointer bg-gray-01 flex gap-2.5 items-center font-roboto text-sm text-gray-11 font-normal rounded-sm border border-gray-06 px-2 py-1 hover:bg-gray-03"
          >
            <Plus size={12} />
            <span className="text-gray-12">Adicionar paciente</span>
          </button>

          <button
            onClick={() => setModalType('edit')}
            className="cursor-pointer bg-gray-01 flex gap-2.5 items-center font-roboto text-sm text-gray-11 font-normal rounded-sm border border-gray-06 px-2 py-1 hover:bg-gray-03"
          >
            <Pencil size={12} />
            <span className="text-gray-12">Editar paciente</span>
          </button>

          <button
            onClick={() => navigate('/doctor/patient/list')}
            className="cursor-pointer bg-gray-01 flex gap-2.5 items-center font-roboto text-sm text-gray-11 font-normal rounded-sm border border-gray-06 px-2 py-1 hover:bg-gray-03"
          >
            <ListNumbers size={12} />
            <span className="text-gray-12">Listar pacientes</span>
          </button>

          <button
            onClick={() => setModalType('exam')}
            className="cursor-pointer bg-gray-01 flex gap-2.5 items-center font-roboto text-sm text-gray-11 font-normal rounded-sm border border-gray-06 px-2 py-1 hover:bg-gray-03"
          >
            <Microscope size={12} />
            <span className="text-gray-12">Inserir dados médicos</span>
          </button>

          <button
            onClick={() => setModalType('predict')}
            className="cursor-pointer bg-gray-01 flex gap-2.5 items-center font-roboto text-sm text-gray-11 font-normal rounded-sm border border-gray-06 px-2 py-1 hover:bg-gray-03"
          >
            <Sparkle size={12} />
            <span className="text-gray-12">Predição</span>
          </button>
        </div>
      </div>

      {modalType && (
        <PatientSearchModal
          onClose={() => setModalType(null)}
          onSelect={handleSelectPatient}
          title={
            modalType === 'predict'
              ? 'Buscar paciente para Predição'
              : modalType === 'edit'
              ? 'Buscar paciente para Edição'
              : 'Buscar paciente para Exames'
          }
        />
      )}
    </>
  );
};

export default PatientOptionsPanel;
