import { NextFunction, Request, Response } from 'express';
import PatientRepository from '../repositories/PatientRepository';
import UpdatePatientProfileUseCase from '../useCases/UpdatePatientProfileUseCase';

export class UpdatePatientProfileController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const patientId = req.user?.id;

      if (!patientId) {
        return res.status(401).json({ error: 'Paciente não autenticado' });
      }

      const {
        name,
        email,
        phoneNumber,
        birthDate,
        gender,
        state,
        ethnicity,
        educationLevel,
      } = req.body;

      // Validações básicas
      if (!name || !email || !phoneNumber) {
        return res.status(400).json({
          error: 'Nome, email e telefone são obrigatórios',
        });
      }

      const patientRepository = new PatientRepository();
      const updatePatientProfileUseCase = new UpdatePatientProfileUseCase(
        patientRepository
      );

      await updatePatientProfileUseCase.execute(patientId, {
        name,
        email,
        phoneNumber,
        birthDate,
        gender,
        state,
        ethnicity,
        educationLevel,
      });

      return res.status(200).json({
        message: 'Dados pessoais atualizados com sucesso',
      });
    } catch (err) {
      next(err);
    }
  }
}

export default UpdatePatientProfileController;
