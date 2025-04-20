import { NextFunction, Request, Response } from 'express';
import AdminRepository from '../repositories/AdminRepository';
import CreateAdminUseCase from '../useCases/CreateAdminUseCase';
import { json } from 'stream/consumers';

export class CreateAdminController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { name, email, password } = req.body;

      const adminRepository = new AdminRepository();
      const createAdminUseCase = new CreateAdminUseCase(adminRepository);

      const admin = await createAdminUseCase.execute({ name, email, password });

      return res.status(200).json(admin);
    } catch (err) {
      next(err);
    }
  }
}
