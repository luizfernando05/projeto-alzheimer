import { Router } from 'express';
import { adminRoutes } from '../../../modules/admin/routes/admin.routes';

const routes = Router();

routes.use('/admin', adminRoutes);

export { routes };
