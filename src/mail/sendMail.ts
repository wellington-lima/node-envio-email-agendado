import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const sendMail = async () => {
	
	try {

		const transport = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: process.env.MAIL_PORT,
			secure: false,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASSWORD
			},
			tls: { rejectUnauthorized: false }
		});

		const mailOptions = {
			from: '"Suporte"<noreply@dominio.com.br>',
			to: process.env.MAIL_TO,
			cc: process.env.MAIL_CC,
			subject: 'Extração de dados',
			attachments: [
				{
					filename: 'arquivo.xlsx',
					path: __dirname + '/files/arquivo.xlsx',
				}
			],
			html: `Prezados, <br>
                Segue o arquivo solicitado: <br><br>
    
                Atenciosamente,<br>
                <strong>Equipe Suporte</strong>`
		}

		await transport.sendMail(mailOptions);

	} catch (error) {
		console.log(error);
	}
}