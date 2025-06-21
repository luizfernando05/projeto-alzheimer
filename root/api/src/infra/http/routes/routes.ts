import { Router } from 'express';
import { adminRoutes } from '../../../modules/admin/routes/admin.routes';
import { doctorRoutes } from '../../../modules/doctor/routes/doctor.routes';
import { patientRoutes } from '../../../modules/patient/routes/patient.routes';
import { medicalDataRoutes } from '../../../modules/medicalData/routes/medicalData.routes';

const routes = Router();

routes.use('/admin', adminRoutes);
routes.use('/doctor', doctorRoutes);
routes.use('/patient', patientRoutes);
routes.use('/data', medicalDataRoutes);

export { routes };
