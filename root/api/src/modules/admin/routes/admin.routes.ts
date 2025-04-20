import { Router } from 'express';
import { CreateAdminController } from '../controllers/CreateAdminController';

const adminRoutes = Router();
const createAdminController = new CreateAdminController();

adminRoutes.post('/', (req, res, next) => {
  createAdminController.handle(req, res, next);
});

export { adminRoutes };
