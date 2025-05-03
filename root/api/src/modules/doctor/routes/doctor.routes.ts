import { Router } from 'express';

import { CreateDoctorController } from '../controllers/CreateDoctorController';
import { LoginDoctorController } from '../controllers/LoginDoctorController';
import { UpdateDoctorController } from '../controllers/UpdateDoctorController';
import { upload } from '../../../config/multer.config';
import ListDoctorController from '../controllers/ListDoctorController';

const doctorRoutes = Router();
const createDoctorController = new CreateDoctorController();
const loginDoctorController = new LoginDoctorController();
const updateDoctorController = new UpdateDoctorController();
const listDoctorController = new ListDoctorController();

doctorRoutes.post(
  '/',
  upload.fields([
    { name: 'crmPhoto', maxCount: 1 },
    { name: 'selfiePhoto', maxCount: 1 },
  ]),
  (req, res, next) => {
    createDoctorController.handle(req, res, next);
  }
);

doctorRoutes.post('/login', (req, res, next) => {
  loginDoctorController.handle(req, res, next);
});

doctorRoutes.put('/:id', (req, res, next) => {
  updateDoctorController.handle(req, res, next);
});

doctorRoutes.get('/list', (req, res, next) => {
  listDoctorController.handle(req, res, next);
});

export { doctorRoutes };
