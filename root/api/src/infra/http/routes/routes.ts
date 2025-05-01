import { Router } from 'express';
import { adminRoutes } from '../../../modules/admin/routes/admin.routes';
import { doctorRoutes } from '../../../modules/doctor/routes/doctor.routes';

const routes = Router();

routes.use('/admin', adminRoutes);
routes.use('/doctor', doctorRoutes);

export { routes };
