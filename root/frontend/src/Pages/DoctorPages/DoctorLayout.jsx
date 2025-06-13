import DoctorSidebar from '../../Components/Sidebar/DoctorSidebar';

const DoctorLayout = ({ children }) => {
  return (
    <div className="flex container mx-auto bg-gray-02">
      <DoctorSidebar />
      <main className="flex-1 px-8 py-6">{children}</main>
    </div>
  );
};

export default DoctorLayout;
