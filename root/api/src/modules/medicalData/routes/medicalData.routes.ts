import { Router } from 'express';
import { ensureDoctorAuthenticated } from '../../shared/middlewares/ensureDoctorAuthenticated';
import CreateMedicalDataController from '../controllers/CreateMedicalDataController';
import GetMMSEDataController from '../controllers/GetMMSEDataController';
import { ensurePatientAuthenticated } from '../../shared/middlewares/ensurePatientAuthenticated';

const medicalDataRoutes = Router();
const createMedicalDataController = new CreateMedicalDataController();
const getMMSEDataController = new GetMMSEDataController();

medicalDataRoutes.post('/', ensureDoctorAuthenticated, (req, res, next) => {
  createMedicalDataController.handle(req, res, next);
});

medicalDataRoutes.get(
  '/mmse/data',
  ensurePatientAuthenticated,
  (req, res, next) => {
    getMMSEDataController.handle(req, res, next);
  }
);

export { medicalDataRoutes };
