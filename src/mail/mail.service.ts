import { Injectable } from '@nestjs/common';
//import { mailBody } from './mail-templates/activate-account.mail';
import * as config from 'config';

var nodemailer = require('nodemailer');
const mailConfig = config.get('mail');

@Injectable()
export class MailService {
  constructor() { }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mailConfig.user,
      pass: mailConfig.password,
    },
  });

  async sendActivationMail(mail, username, activationCode) {
    const mailOptions = {
      from: 'nidhal.sabbah@gmail.com',
      to: mail,
      template: '',
      subject: 'please activate your account',
      context: { username: username },
      html: `Hello ${username}, your activation code is ${activationCode}  `,
    };

    await this.transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
  }


  async successActivatedAccountMail(mail, username) {
    const mailOptions = {
      from: 'nidhal.sabbah@gmail.com',
      to: mail,
      template: '',
      subject: `Welcom ${username}`,
      context: { username: username },
      html: `Wellcom ${username}, your account is now active`,
    };

    await this.transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
  }

  async sendRequestParticipationMail(organizerUsername, participantUsername, participantMail, eventTitle) {
    const mailOptions = {
      from: 'nidhal.sabbah@gmail.com',
      to: participantMail,
      subject: participantUsername + ' wants to participate to ' + eventTitle,
      context: { username: participantUsername },
      html: 'hello ' + organizerUsername + ', ' + participantUsername + ' sent a request to paricipate to ' + eventTitle,
    };

    await this.transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });

    return 'need to code and send request functioon';
  }

  async sendResetPasswordRequestMail(mail, resetUrl) {
    const mailOptions = {
      from: 'nidhal.sabbah@gmail.com',
      to: mail,
      template: '',
      subject: 'Reset password requested',
      html: `
      <p>Dear user,</p>
<p>
          You can reset your password by going to
          <a href="${resetUrl}">this link</a>
      </p>
  `,
    };

    await this.transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
  }

  async sendResetedPasswordMail(mail) {
    const mailOptions = {
      from: 'nidhal.sabbah@gmail.com',
      to: mail,
      template: '',
      subject: 'Your password has been reseted',
      html: `
      <p>Dear user,</p>
<p>
          Your password has been rested
          
      </p>
  `,
    };

    await this.transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
  }
}
