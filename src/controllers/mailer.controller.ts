import { config } from 'dotenv';
import { Request, Response, response } from 'express';
import md5 from 'md5';
import nodemailer from 'nodemailer';
import { User } from '../models/';
import { BaseController } from './';

export class MailerController extends BaseController<User> {
  private mailOptions = {};
  constructor() {
    super(User);
    config();
  }
  public async resetPassword(
    request: Request,
    response: Response
  ): Promise<Response<User>> {
    const { email } = request.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return response.status(400).json({
        isValid: false,
        message: `O e-mail ${email} nao esta cadastrado`,
        error: 'unique_email',
      });
    } else {
      this.createNewPassword(user);
    }
    return response.status(200).json({ message: 'Email changed' });
  }
  private emailCredentials() {
    return nodemailer.createTransport({
      host: process.env.DB_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.BASE_EMAIL,
        pass: process.env.DB_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });
  }
  private createNewPassword(user: User) {
    let newPassword: string = '';
    for (let i = 0; i <= 3; i++) {
      newPassword += newPassword.charAt(
        Math.floor(Math.random() * '1234567890'.length)
      );
    }
    this.mailOptions = {
      from: process.env.BASE_EMAIL,
      to: user.email,
      subject: 'Alteraçao de senha',
      html:
        '<p>Ola ' +
        user.name +
        '! Sua nova senha </p><h1>' +
        newPassword +
        '</h1>',
    };
    this.sendEmail(response, user, newPassword);
  }
  private sendEmail(response: Response, user: User, newPassword: string) {
    this.emailCredentials().sendMail(this.mailOptions, (error, info) => {
      if (error) {
        return response.status(400).json({
          isValid: false,
          error: 'email_no_sent',
          message: 'Nao foi possivel enviar o seu e-mail',
        });
      } else {
        const { name, email } = user;
        const id: string = String(user.id);
        const password = md5(newPassword);
        User.update({ name, email, password }, { where: { id } });
        return response.status(200).json({
          isValid: true,
          message: `Código enviado para o e-mail ${email}`,
          success: 'unique_email',
        });
      }
    });
  }
}
