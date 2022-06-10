import nodemailer from 'nodemailer';

import config from '../config'

class Mail {
  private transporter = nodemailer.createTransport({
    // @ts-ignore
    host: config.MAIL_HOST,
    port: config.MAIL_PORT,
    tls: true,
    auth: {
      user: config.MAIL_USER,
      pass: config.MAIL_PASSWORD,
    }
  });

  send(to: string, subject: string, html: string) {
    return this.transporter.sendMail({
      to,
      subject,
      from: `"Ghost 👻" <${config.MAIL_FROM}>`,
      // TODO: Use HTML templates
      html, 
    });
  }
}

export default Mail;
