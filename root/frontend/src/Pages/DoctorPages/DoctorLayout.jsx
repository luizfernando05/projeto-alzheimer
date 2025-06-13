import DoctorHeader from '../../Components/Header/DoctorHeader';
import DoctorSidebar from '../../Components/Sidebar/DoctorSidebar';

const DoctorLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen">
      <DoctorSidebar />
      <div className="flex-1 flex flex-col">
        <DoctorHeader />
        <main className="flex-1 px-8 py-6 bg-gray-02 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
