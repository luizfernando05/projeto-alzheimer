import { NextFunction, Request, Response } from 'express';
import DoctorRepository from '../repositories/DoctorRepository';
import { UpdateDoctorStatusUseCase } from '../useCases/UpdateDoctorStatusUseCase';
import { MailService } from '../../shared/services/MailService';

export class UpdateDoctorStatusController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const { status, rejectionReason } = req.body;

      const doctorRepository = new DoctorRepository();
      const updateDoctorStatusUseCase = new UpdateDoctorStatusUseCase(
        doctorRepository
      );

      const doctor = await updateDoctorStatusUseCase.execute({
        id,
        status,
        rejectionReason,
      });

      const mailService = new MailService();

      let subject = '';
      let message = '';

      if (status === 'APPROVED') {
        subject = '[AlzCheck] Cadastro aprovado!';
        message = `Olá, Dr(a). ${doctor.name}!\n\nSeu cadastro foi aprovado com sucesso. Agora você já pode acessar o sistema normalmente.\n\nSeja bem-vindo(a) à plataforma!\n\nEquipe de Suporte`;
      } else if (status === 'REJECTED') {
        subject = '[AlzCheck] Cadastro reprovado';
        message = `Olá, Dr(a). ${doctor.name},\n\nInfelizmente, seu cadastro foi reprovado.\nMotivo: ${rejectionReason || 'Não especificado'}\n\nCaso queira reenviar os dados ou esclarecer dúvidas, entre em contato com nosso suporte.\n\nAtenciosamente,\nEquipe de Suporte`;
      } else {
        subject = 'Atualização no status do cadastro';
        message = `Olá, Dr(a). ${doctor.name},\n\nO status do seu cadastro foi atualizado para: ${status}.\n\nAtenciosamente,\nEquipe de Suporte`;
      }

      await mailService.sendMail(doctor.email, subject, message);

      return res.status(200).json(doctor);
    } catch (err) {
      next(err);
    }
  }
}
