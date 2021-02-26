import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

class SendMailService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const { user, pass } = account;
      const { host, port, secure } = account.smtp;
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass,
        },
      });
      this.client = transporter;
    });
  }

  async execute(
    to: string,
    subject: string,
    variables: unknown,
    path: string,
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');
    const mailTemplateParsed = handlebars.compile(templateFileContent);
    const html = mailTemplateParsed(variables);
    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: 'NPS <noreply@nps.com.br>',
    });

    console.log('message.messageId :>> ', message.messageId);
    console.log('PreviewURL :>> ', nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();
