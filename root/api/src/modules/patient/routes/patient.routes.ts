import { Router } from 'express';
import { upload } from '../../../config/multer.config';
import CreatePatientController from '../controllers/CreatePatientController';
import { ensureDoctorAuthenticated } from '../../shared/middlewares/ensureDoctorAuthenticated';

const patientRoutes = Router();
const createPatientController = new CreatePatientController();

patientRoutes.post(
  '/',

  ensureDoctorAuthenticated,

  upload.fields([{ name: 'selfiePhoto', maxCount: 1 }]),
  (req, res, next) => {
    createPatientController.handle(req, res, next);
  }
);

export { patientRoutes };
