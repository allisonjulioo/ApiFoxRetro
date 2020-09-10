import { config } from 'dotenv';
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { User } from '../models/';
import { generateCode } from '../utils/generators/code';
import { BaseController } from './';

export class RemindController extends BaseController<User> {
  private mailOptions = {};
  private successInfo = {};
  constructor() {
    super(User);
    config();
  }
  public async resetPassword(
    request: Request,
    response: Response
  ): Promise<any> {
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
      await this.generateCode(response, user);
    }
  }
  private async generateCode(response: Response, user: User) {
    const code: number = generateCode(4);
    this.mailOptions = {
      from: process.env.BASE_EMAIL,
      to: user.email,
      subject: 'Alteraçao de senha',
      html:
        '<p>Ola ' +
        user.name +
        '! Seu codigo de verificacao e: </p><h1>' +
        code +
        '</h1>',
    };
    this.sendEmail(user, code)
      .then(() => {
        response.status(200).json({
          isValid: true,
          message: `Código enviado para o e-mail ${user.email}`,
          success: 'unique_email',
          malier: this.successInfo,
        });
      })
      .catch((error) => {
        return response.status(400).json({
          isValid: false,
          error: 'email not sent',
          message: 'Nao foi possivel enviar o seu e-mail adsa',
          malier: error,
        });
      });
    return;
  }
  private async sendEmail(user: User, code_verification: number) {
    const transporter = nodemailer.createTransport({
      host: process.env.DB_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.BASE_EMAIL,
        pass: process.env.DB_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });
    return transporter.sendMail(this.mailOptions, async (error, info) => {
      if (error) {
        return error;
      } else {
        const id: string = String(user.id);
        console.log(info);
        this.successInfo = await User.update(
          { code_verification },
          { where: { id } }
        );
        return info;
      }
    });
  }
}
