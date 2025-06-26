import { Router } from 'express';
import { upload } from '../../../config/multer.config';
import CreatePatientController from '../controllers/CreatePatientController';
import { ensureDoctorAuthenticated } from '../../shared/middlewares/ensureDoctorAuthenticated';
import { ListPatientsByDoctorController } from '../controllers/ListPatientsByDoctorController';
import { CountPatientsByDoctorController } from '../controllers/CountPatientsByDoctorController';
import { GetPatientSummaryController } from '../controllers/GetPatientSummaryController';
import GetPatientsByLast7DaysController from '../controllers/GetPatientsByLast7DaysController';

const patientRoutes = Router();
const createPatientController = new CreatePatientController();
const listPatientsByDoctorController = new ListPatientsByDoctorController();
const countPatientsByDoctorController = new CountPatientsByDoctorController();
const getPatientSummaryController = new GetPatientSummaryController();
const getPatientsByLast7DaysController = new GetPatientsByLast7DaysController();

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

patientRoutes.get('/summary', ensureDoctorAuthenticated, (req, res, next) => {
  getPatientSummaryController.handle(req, res, next);
});

patientRoutes.get(
  '/last-7-days',
  ensureDoctorAuthenticated,
  (req, res, next) => {
    getPatientsByLast7DaysController.handle(req, res, next);
  }
);

export { patientRoutes };
