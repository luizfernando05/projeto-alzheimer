import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorLayout from '../DoctorLayout';
import { UsersFour } from '@phosphor-icons/react';
import PatientOptionsPanel from '../../../Components/Patient/PatientOptionsPanel';
import PatientSummaryCard from '../../../Components/Patient/PatientSummaryCard';
import PatientSimplifiedList from '../../../Components/Patient/PatientSimplifiedList';

const MainModule = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const [growth, setGrowth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summary = await axios.get(
          'http://localhost:3001/patient/summary',
          {
            withCredentials: true,
          }
        );
        setTotalPatients(summary.data.total);
        setGrowth(summary.data.growth);

        const weekly = await axios.get(
          'http://localhost:3001/patient/last-7-days',
          {
            withCredentials: true,
          }
        );
        setWeeklyData(weekly.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DoctorLayout>
      <section className="w-full">
        <div className="bg-gray-01 rounded-xl shadow-sm border border-gray-06">
          <div className="flex gap-6 pt-6 pb-6 pr-8 pl-8 border-b border-gray-06">
            <div className="bg-gray-02 pr-2 pl-2 pt-1 pb-1 border border-gray-06 rounded-sm text-gray-11">
              <UsersFour size={16} />
            </div>
            <h2 className="text-xl font-poppins font-normal text-gray-12">
              Pacientes
            </h2>
          </div>

          <div className="pt-6 pr-8 pl-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <PatientOptionsPanel />
              <PatientSummaryCard
                loading={loading}
                totalPatients={totalPatients}
                growth={growth}
                weeklyData={weeklyData}
              />
            </div>
            <div className="pb-6">
              <PatientSimplifiedList />
            </div>
          </div>
        </div>
      </section>
    </DoctorLayout>
  );
};

export default MainModule;
