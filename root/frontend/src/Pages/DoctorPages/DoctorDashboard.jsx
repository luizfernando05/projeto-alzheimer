import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorLayout from './DoctorLayout';
import GenderStatsCard from '../../Components/Patient/GenderStatsCard';
import PatientSummaryCard from '../../Components/Patient/PatientSummaryCard';
import PatientSimplifiedList from '../../Components/Patient/PatientSimplifiedList';
import DiagnosesChart from '../../Components/Patient/DiagnosesChart';
import StatusChart from '../../Components/Patient/StatusChart';

const apiUrl = import.meta.env.VITE_API_URL;

const DoctorDashboard = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const [growth, setGrowth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summary = await axios.get(`${apiUrl}/patient/summary`, {
          withCredentials: true,
        });
        setTotalPatients(summary.data.total);
        setGrowth(summary.data.growth);

        const weekly = await axios.get(`${apiUrl}/patient/last-7-days`, {
          withCredentials: true,
        });
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="pb-6">
            <DiagnosesChart />
          </div>
          <div className="pb-6">
            <PatientSimplifiedList />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <GenderStatsCard />
          <PatientSummaryCard
            loading={loading}
            totalPatients={totalPatients}
            growth={growth}
            weeklyData={weeklyData}
          />
          <StatusChart />
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorDashboard;
