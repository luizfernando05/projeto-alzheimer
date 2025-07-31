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

      const subjectBase = '[AlzCheck]';
      const logoUrl = 'https://i.postimg.cc/jjJNy73V/Icon-1.png';

      let subject = '';
      let html = '';

      if (status === 'APPROVED') {
        subject = `${subjectBase} Cadastro aprovado!`;
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
            <div style="text-align: center;">
              <img src="${logoUrl}" alt="Logo do App" style="max-width: 150px; margin-bottom: 20px;" />
            </div>

            <h2 style="color: #5B5BD6;">Cadastro Aprovado!</h2>
            <p>Olá, Dr(a). <strong>${doctor.name}</strong>,</p>

            <p>Seu cadastro foi <strong>aprovado</strong> com sucesso. Agora você pode acessar a plataforma e começar a cadastrar pacientes.</p>

            <a href="http://localhost:5173/login/doctor" style="display: inline-block; padding: 12px 20px; background-color: #5B5BD6; color: #fff; text-decoration: none; border-radius: 4px; margin-top: 20px;">
              Acessar Plataforma
            </a>

            <p style="margin-top: 30px;">Se tiver dúvidas, entre em contato com nossa equipe.</p>
            <p>Atenciosamente,<br/>Equipe AlzCheck</p>
          </div>
        `;
      } else if (status === 'REJECTED') {
        subject = `${subjectBase} Cadastro reprovado`;
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
            <div style="text-align: center;">
              <img src="${logoUrl}" alt="Logo do App" style="max-width: 150px; margin-bottom: 20px;" />
            </div>

            <h2 style="color: #D9534F;">Cadastro Reprovado</h2>
            <p>Olá, Dr(a). <strong>${doctor.name}</strong>,</p>

            <p>Infelizmente, seu cadastro foi <strong>reprovado</strong>.</p>
            <p><strong>Motivo:</strong> ${rejectionReason || 'Não especificado'}</p>

            <p>Se desejar reenviar os dados ou esclarecer dúvidas, entre em contato com nosso suporte.</p>

            <p style="margin-top: 30px;">Atenciosamente,<br/>Equipe AlzCheck</p>
          </div>
        `;
      } else {
        subject = `${subjectBase} Atualização no status do cadastro`;
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
            <div style="text-align: center;">
              <img src="${logoUrl}" alt="Logo do App" style="max-width: 150px; margin-bottom: 20px;" />
            </div>

            <h2 style="color: #5B5BD6;">Atualização de Status</h2>
            <p>Olá, Dr(a). <strong>${doctor.name}</strong>,</p>

            <p>O status do seu cadastro foi atualizado para: <strong>${status}</strong>.</p>

            <p>Se tiver dúvidas, entre em contato com nossa equipe.</p>

            <p style="margin-top: 30px;">Atenciosamente,<br/>Equipe AlzCheck</p>
          </div>
        `;
      }

      await mailService.sendMail(doctor.email, subject, undefined, html);

      return res.status(200).json(doctor);
    } catch (err) {
      next(err);
    }
  }
}
