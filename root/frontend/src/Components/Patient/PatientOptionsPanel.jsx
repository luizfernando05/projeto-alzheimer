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

const PatientOptionsPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-02 rounded-lg border border-gray-06 overflow-hidden">
      <div className="flex gap-3 pt-5 pb-5 pr-6 pl-6 border-b border-gray-06">
        <div className="border border-gray-06 p-1 rounded-sm">
          <Gear size={16} />
        </div>
        <h2 className="text-base font-poppins font-normal text-gray-12">
          Opções
        </h2>
      </div>
      <div className="pt-4 pb-5 pr-6 pl-6 flex flex-wrap gap-3">
        {[
          {
            icon: <Plus size={12} />,
            label: 'Adicionar paciente',
            onClick: () => navigate('/doctor/patient/create'),
          },
          { icon: <Pencil size={12} />, label: 'Editar paciente' },
          {
            icon: <ListNumbers size={12} />,
            label: 'Listar pacientes',
            onClick: () => navigate('/doctor/patient/list'),
          },
          {
            icon: <Microscope size={12} />,
            label: 'Inserir resultados de exames',
          },
          { icon: <Sparkle size={12} />, label: 'Predição' },
          {
            icon: <HeadCircuit size={12} />,
            label: 'Roteiro do Mini-Exame do Estado Mental',
          },
        ].map(({ icon, label, onClick }, i) => (
          <button
            key={i}
            onClick={onClick}
            className="cursor-pointer bg-gray-01 flex gap-2.5 items-center font-roboto text-sm text-gray-11 font-normal rounded-sm border border-gray-06 pt-1 pb-1 pl-2 pr-2 hover:bg-gray-03"
          >
            {icon}
            <span className="text-gray-12">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PatientOptionsPanel;
