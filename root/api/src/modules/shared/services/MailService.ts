import { createTransport } from 'nodemailer';

export class MailService {
  private transporter;

  constructor() {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendMail(to: string, subject: string, text?: string, html?: string) {
    await this.transporter.sendMail({
      from: `"Equipe AlzCheck" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
  }
}
