import { Router } from 'express';
import { PredictionController } from '../controllers/PredictionController';

const predictionRoutes = Router();
const predictionController = new PredictionController();

predictionRoutes.post('/', (req, res) => {
  predictionController.create(req, res);
});

export { predictionRoutes };
