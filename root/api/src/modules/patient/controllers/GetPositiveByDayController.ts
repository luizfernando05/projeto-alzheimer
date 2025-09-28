import { Request, Response } from 'express';
import { GetPositiveByDayUseCase } from '../useCases/GetPositiveByDayUseCase';
import PatientRepository from '../repositories/PatientRepository';

export class GetPositiveByDayController {
  async handle(req: Request, res: Response) {
    try {
      const doctorId = req.user.id;

      const useCase = new GetPositiveByDayUseCase(new PatientRepository());
      const data = await useCase.execute(doctorId);

      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: 'Erro ao buscar diagnósticos positivos por dia' });
    }
  }
}
