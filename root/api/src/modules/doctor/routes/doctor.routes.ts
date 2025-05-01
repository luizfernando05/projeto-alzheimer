import { Router } from 'express';
import { CreateDoctorController } from '../controllers/CreateDoctorController';
import { LoginDoctorController } from '../controllers/LoginDoctorController';
import { UpdateDoctorController } from '../controllers/UpdateDoctorController';

const doctorRoutes = Router();
const createDoctorController = new CreateDoctorController();
const loginDoctorController = new LoginDoctorController();
const updateDoctorController = new UpdateDoctorController();

doctorRoutes.post('/', (req, res, next) => {
  createDoctorController.handle(req, res, next);
});

doctorRoutes.post('/login', (req, res, next) => {
  loginDoctorController.handle(req, res, next);
});

doctorRoutes.put('/:id', (req, res, next) => {
  updateDoctorController.handle(req, res, next);
});

export { doctorRoutes };
