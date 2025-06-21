import { Router } from 'express';
import { ensureDoctorAuthenticated } from '../../shared/middlewares/ensureDoctorAuthenticated';
import CreateMedicalDataController from '../controllers/CreateMedicalDataController';

const medicalDataRoutes = Router();
const createMedicalDataController = new CreateMedicalDataController();

medicalDataRoutes.post('/', ensureDoctorAuthenticated, (req, res, next) => {
  createMedicalDataController.handle(req, res, next);
});

export { medicalDataRoutes };
