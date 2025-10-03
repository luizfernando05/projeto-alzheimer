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
import { GetGenderStatsController } from '../controllers/GetGenderStatsController';
import { GetDoctorPredictionsSummaryController } from '../controllers/GetDoctorPredictionsSummaryController';
import { GetPositiveByDayController } from '../controllers/GetPositiveByDayController';
import { LoginPatientController } from '../controllers/LoginPatientController';
import GetPatientController from '../controllers/GetPatientController';
import { ensurePatientAuthenticated } from '../../shared/middlewares/ensurePatientAuthenticated';

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
const getGenderStatsController = new GetGenderStatsController();
const getDoctorPredictionsSummaryController =
  new GetDoctorPredictionsSummaryController();
const getPositiveByDayController = new GetPositiveByDayController();
const loginPatientController = new LoginPatientController();
const getPatientController = new GetPatientController();

patientRoutes.post('/login', (req, res, next) => {
  loginPatientController.handle(req, res, next);
});

patientRoutes.post(
  '/',
  ensureDoctorAuthenticated,
  upload.fields([{ name: 'selfiePhoto', maxCount: 1 }]),
  (req, res, next) => {
    createPatientController.handle(req, res, next);
  }
);

patientRoutes.get('/get/data', ensurePatientAuthenticated, (req, res, next) => {
  getPatientController.hanlde(req, res, next);
});

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
  '/gender-stats',
  ensureDoctorAuthenticated,
  (req, res, next) => {
    getGenderStatsController.handle(req, res, next);
  }
);

patientRoutes.get(
  '/predictions/summary',
  ensureDoctorAuthenticated,
  (req, res) => {
    getDoctorPredictionsSummaryController.handle(req, res);
  }
);

patientRoutes.get('/positive-by-day', ensureDoctorAuthenticated, (req, res) => {
  getPositiveByDayController.handle(req, res);
});

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
