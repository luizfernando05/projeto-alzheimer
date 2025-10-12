import { Router } from 'express';
import { PredictionController } from '../controllers/PredictionController';
import { ensureDoctorAuthenticated } from '../../shared/middlewares/ensureDoctorAuthenticated';
import { GetPatientPredictionsController } from '../controllers/GetPatientPredictionsController';
import { GetPatientPredictionsUseCase } from '../useCases/GetPatientPredictionsUseCase';
import { PredictionRepository } from '../repositories/PredictionRepository';

const predictionRoutes = Router();
const predictionController = new PredictionController();

const predictionRepository = new PredictionRepository();
const getPatientPredictionsUseCase = new GetPatientPredictionsUseCase(
  predictionRepository
);
const getPatientPredictionsController = new GetPatientPredictionsController(
  getPatientPredictionsUseCase
);

predictionRoutes.post('/', ensureDoctorAuthenticated, (req, res) => {
  predictionController.create(req, res);
});

predictionRoutes.get(
  '/:patientId/predictions',
  ensureDoctorAuthenticated,
  (req, res) => {
    getPatientPredictionsController.handle(req, res);
  }
);

export { predictionRoutes };
