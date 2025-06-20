import { Router } from 'express';

import { CreateDoctorController } from '../controllers/CreateDoctorController';
import { LoginDoctorController } from '../controllers/LoginDoctorController';
import { UpdateDoctorController } from '../controllers/UpdateDoctorController';
import { upload } from '../../../config/multer.config';
import ListDoctorController from '../controllers/ListDoctorController';
import { ensureDoctorAuthenticated } from '../../shared/middlewares/ensureDoctorAuthenticated';
import DoctorRepository from '../repositories/DoctorRepository';
import { AppError } from '../../shared/errors/AppError';

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

doctorRoutes.get(
  '/profile',
  ensureDoctorAuthenticated,
  async (req, res, next) => {
    try {
      const doctorRepository = new DoctorRepository();
      const doctor = await doctorRepository.findById(req.user.id);

      if (!doctor) {
        return next(new AppError('Médico não encontrado', 404));
      }

      res.status(200).json({
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
      });
    } catch (err) {
      next(err);
    }
  }
);

export { doctorRoutes };
