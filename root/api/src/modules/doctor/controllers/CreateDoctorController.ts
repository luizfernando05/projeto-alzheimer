import { unlink } from 'fs/promises';
import { NextFunction, Request, Response } from 'express';
import DoctorRepository from '../repositories/DoctorRepository';
import CreateDoctorUseCase from '../useCases/CreateDoctorUseCase';
import { CreateDoctorValidator } from '../validations/CreateDoctorValidator';
import { handleValidationError } from '../../shared/errors/handleValidationError';

export class CreateDoctorController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    let crmPhotoPath: string | undefined;
    let selfiePhotoPath: string | undefined;

    try {
      await CreateDoctorValidator.validate(req.body, { abortEarly: false });

      const { name, email, crm, password } = req.body;

      const doctorRepository = new DoctorRepository();
      const createDoctorUseCase = new CreateDoctorUseCase(doctorRepository);

      if (!req.files || typeof req.files !== 'object') {
        return res.status(400).json({ message: 'Files are required' });
      }

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const crmPhotoFile = files['crmPhoto']?.[0];
      const selfiePhotoFile = files['selfiePhoto']?.[0];

      if (!crmPhotoFile || !selfiePhotoFile) {
        return res
          .status(400)
          .json({ message: 'CRM photo and selfie are required' });
      }

      crmPhotoPath = crmPhotoFile.path;
      selfiePhotoPath = selfiePhotoFile.path;

      const doctor = await createDoctorUseCase.execute({
        name,
        email,
        crm,
        password,
        crmPhoto: crmPhotoPath,
        selfiePhoto: selfiePhotoPath,
      });

      return res.status(201).json(doctor);
    } catch (err) {
      if (crmPhotoPath) {
        await unlink(crmPhotoPath).catch(() => {});
      }
      if (selfiePhotoPath) {
        await unlink(selfiePhotoPath).catch(() => {});
      }

      if (handleValidationError(err, next)) return;
      next(err);
    }
  }
}

export default CreateDoctorController;
