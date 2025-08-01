import { Router } from 'express';
import { upload } from '../../../config/multer.config';
import CreatePatientController from '../controllers/CreatePatientController';
import { ensureDoctorAuthenticated } from '../../shared/middlewares/ensureDoctorAuthenticated';
import { ListPatientsByDoctorController } from '../controllers/ListPatientsByDoctorController';
import { CountPatientsByDoctorController } from '../controllers/CountPatientsByDoctorController';
import { GetPatientSummaryController } from '../controllers/GetPatientSummaryController';
import GetPatientsByLast7DaysController from '../controllers/GetPatientsByLast7DaysController';
import ListPatientsByDoctorWithFiltersController from '../controllers/ListPatientsByDoctorWithFiltersController';
import UpdatePatientController from '../controllers/UpdatePatientController';
import { GetPatientDetailsController } from '../controllers/GetPatientDetailsController';
import { DownloadPatientPdfController } from '../controllers/DownloadPatientPdfController';

const patientRoutes = Router();
const createPatientController = new CreatePatientController();
const listPatientsByDoctorController = new ListPatientsByDoctorController();
const countPatientsByDoctorController = new CountPatientsByDoctorController();
const getPatientSummaryController = new GetPatientSummaryController();
const getPatientsByLast7DaysController = new GetPatientsByLast7DaysController();
const listPatientsByDoctorWithFiltersController =
  new ListPatientsByDoctorWithFiltersController();
const updatePatientController = new UpdatePatientController();
const getPatientDetailsController = new GetPatientDetailsController();
const downloadPatientPdfController = new DownloadPatientPdfController();

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

patientRoutes.get(
  '/doctors/list/filters',
  ensureDoctorAuthenticated,
  (req, res, next) => {
    listPatientsByDoctorWithFiltersController.handle(req, res, next);
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

patientRoutes.get(
  '/:patientId',
  ensureDoctorAuthenticated,
  (req, res, next) => {
    getPatientDetailsController.handle(req, res, next);
  }
);

patientRoutes.put('/:id', (req, res, next) => {
  updatePatientController.handle(req, res, next);
});

patientRoutes.get(
  '/:patientId/pdf',
  ensureDoctorAuthenticated,
  (req, res, next) => downloadPatientPdfController.handle(req, res, next)
);

export { patientRoutes };
