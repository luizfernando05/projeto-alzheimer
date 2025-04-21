import { Router } from 'express';
import { CreateAdminController } from '../controllers/CreateAdminController';
import { LoginAdminController } from '../controllers/LoginAdminController';

const adminRoutes = Router();
const createAdminController = new CreateAdminController();
const loginAdminController = new LoginAdminController();

adminRoutes.post('/', (req, res, next) => {
  createAdminController.handle(req, res, next);
});

adminRoutes.post('/login', (req, res, next) => {
  loginAdminController.handle(req, res, next);
});

export { adminRoutes };
