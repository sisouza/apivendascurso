import nodemailer from 'nodemailer';

interface ISendMail {
  to: string;
  body: string;
}
//setting nodemailer
export default class EtherealMail {
  //message obj
  static async sendMail({ to, body }: ISendMail): Promise<void> {
    //creating test ethereal account
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    //body message
    const message = await transporter.sendMail({
      from: 'testeemail@email.com.br',
      to,
      subject: 'Teste Email',
      text: body,
    });
    //see message
    console.log('Message sent %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
