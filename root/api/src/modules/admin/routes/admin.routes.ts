import { Router } from 'express';
import { CreateAdminController } from '../controllers/CreateAdminController';
import { LoginAdminController } from '../controllers/LoginAdminController';
import UpdateAdminController from '../controllers/UpdateAdminController';

const adminRoutes = Router();
const createAdminController = new CreateAdminController();
const loginAdminController = new LoginAdminController();
const updateAdminController = new UpdateAdminController();

adminRoutes.post('/', (req, res, next) => {
  createAdminController.handle(req, res, next);
});

adminRoutes.post('/login', (req, res, next) => {
  loginAdminController.handle(req, res, next);
});

adminRoutes.put('/:id', (req, res, next) => {
  updateAdminController.handle(req, res, next);
});

export { adminRoutes };
