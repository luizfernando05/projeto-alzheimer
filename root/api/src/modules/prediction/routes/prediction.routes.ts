import { Router } from 'express';
import { PredictionController } from '../controllers/PredictionController';
import { ensureDoctorAuthenticated } from '../../shared/middlewares/ensureDoctorAuthenticated';

const predictionRoutes = Router();
const predictionController = new PredictionController();

predictionRoutes.post('/', ensureDoctorAuthenticated, (req, res) => {
  predictionController.create(req, res);
});

export { predictionRoutes };
