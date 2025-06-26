import { Router } from 'express';
import { upload } from '../../../config/multer.config';
import CreatePatientController from '../controllers/CreatePatientController';
import { ensureDoctorAuthenticated } from '../../shared/middlewares/ensureDoctorAuthenticated';
import { ListPatientsByDoctorController } from '../controllers/ListPatientsByDoctorController';
import { CountPatientsByDoctorController } from '../controllers/CountPatientsByDoctorController';

const patientRoutes = Router();
const createPatientController = new CreatePatientController();
const listPatientsByDoctorController = new ListPatientsByDoctorController();
const countPatientsByDoctorController = new CountPatientsByDoctorController();

patientRoutes.post(
  '/',
  ensureDoctorAuthenticated,
  upload.fields([{ name: 'selfiePhoto', maxCount: 1 }]),
  (req, res, next) => {
    createPatientController.handle(req, res, next);
  }
);

patientRoutes.get(
  '/doctors/list',
  ensureDoctorAuthenticated,
  (req, res, next) => {
    listPatientsByDoctorController.hanlde(req, res, next);
  }
);

patientRoutes.get('/count', ensureDoctorAuthenticated, (req, res, next) => {
  countPatientsByDoctorController.handle(req, res, next);
});

export { patientRoutes };
