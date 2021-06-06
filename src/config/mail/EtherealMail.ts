import nodemailer from 'nodemailer';
import handlebarsMailTemplate from './HandlebarsMailTemplate';
interface ITemplateVariable {
  [key: string]: string | number;
}
interface IParseMailTemplate {
  template: string;
  vars: ITemplateVariable;
}
interface IMailContact {
  name: string;
  email: string;
}
interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}
//setting nodemailer
export default class EtherealMail {
  //message obj
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    //creating test ethereal account
    const account = await nodemailer.createTestAccount();

    //setting a new instance of mailtemplate so we can use methods
    const mailTemplate = new handlebarsMailTemplate();

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
      from: {
        name: from?.name || 'Equipe API Teste Email',
        address: from?.email || 'testeemail@email.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
    //see message
    console.log('Message sent %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
