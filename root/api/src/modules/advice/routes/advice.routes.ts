import { Router } from 'express';
import { AdviceController } from '../controllers/AdviceController';

const adviceRoutes = Router();
const adviceController = new AdviceController();

adviceRoutes.post('/', (req, res) => {
  adviceController.generate(req, res);
});

export { adviceRoutes };
