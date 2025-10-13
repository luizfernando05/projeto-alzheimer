import { Router } from 'express';
import { upload } from '../../../config/multer.config';
import { Request, Response } from 'express';
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
import { AppError } from '../../shared/errors/AppError';
import PatientRepository from '../repositories/PatientRepository';
import UpdatePatientProfileController from '../controllers/UpdatePatientProfileController';
import GetMedicalHistoryController from '../controllers/GetMedicalHistoryController';
import GetPersonalizedRecommendationsController from '../controllers/GetPersonalizedRecommendationsController';
import { DeletePatientController } from '../controllers/DeletePatientController';
import { DeletePatientUseCase } from '../useCases/DeletePatientUseCase';

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
const updatePatientProfileController = new UpdatePatientProfileController();
const getMedicalHistoryController = new GetMedicalHistoryController();
const getPersonalizedRecommendationsController =
  new GetPersonalizedRecommendationsController();
const deletePatientController = new DeletePatientController();

patientRoutes.post('/login', (req, res, next) => {
  loginPatientController.handle(req, res, next);
});

patientRoutes.post('/logout', (req, res) => {
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  res.status(200).json({ message: 'Logout realizado com sucesso' });
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
  '/recommendations',
  ensurePatientAuthenticated,
  (req, res, next) => {
    getPersonalizedRecommendationsController.handle(req, res, next);
  }
);

patientRoutes.get(
  '/predictions/summary',
  ensureDoctorAuthenticated,
  (req, res) => {
    getDoctorPredictionsSummaryController.handle(req, res);
  }
);

patientRoutes.get(
  '/medical/history',
  ensurePatientAuthenticated,
  (req, res, next) => {
    getMedicalHistoryController.handle(req, res, next);
  }
);

patientRoutes.get('/positive-by-day', ensureDoctorAuthenticated, (req, res) => {
  getPositiveByDayController.handle(req, res);
});

patientRoutes.get(
  '/profile',
  ensurePatientAuthenticated,
  async (req, res, next) => {
    try {
      const patientRepository = new PatientRepository();
      const patient = await patientRepository.findById(req.user.id);

      if (!patient) {
        return next(new AppError('Paciente não encontrado', 404));
      }

      res.status(200).json({
        id: patient.id,
        name: patient.name,
        email: patient.email,
        role: 'patient',
      });
    } catch (err) {
      next(err);
    }
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

patientRoutes.put(
  '/profile/update',
  ensurePatientAuthenticated,
  (req, res, next) => {
    updatePatientProfileController.handle(req, res, next);
  }
);

patientRoutes.delete(
  '/delete/:id',
  ensureDoctorAuthenticated,
  async (req, res, next) => {
    try {
      await deletePatientController.handle(req, res);
    } catch (err) {
      next(err);
    }
  }
);

patientRoutes.get(
  '/:patientId/pdf',
  ensureDoctorAuthenticated,
  (req, res, next) => downloadPatientPdfController.handle(req, res, next)
);
export { patientRoutes };
