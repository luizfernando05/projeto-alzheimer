import { Router } from 'express';
import { upload } from '../../../config/multer.config';
import CreatePatientController from '../controllers/CreatePatientController';

const patientRoutes = Router();
const createPatientController = new CreatePatientController();

patientRoutes.post(
  '/',
  upload.fields([{ name: 'selfiePhoto', maxCount: 1 }]),
  (req, res, next) => {
    createPatientController.handle(req, res, next);
  }
);

export { patientRoutes };
