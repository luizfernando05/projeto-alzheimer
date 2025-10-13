import { Request, Response } from 'express';
import { DeletePatientUseCase } from '../useCases/DeletePatientUseCase';
import PatientRepository from '../repositories/PatientRepository';

export class DeletePatientController {
  handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const doctorId = req.user?.id;

      if (!doctorId) {
        return res.status(401).json({ error: 'Token inválido' });
      }

      const patientRepository = new PatientRepository();
      const deletePatientUseCase = new DeletePatientUseCase(patientRepository);

      await deletePatientUseCase.execute(id, doctorId);

      return res.status(200).json({ message: 'Paciente deletado com sucesso' });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}
