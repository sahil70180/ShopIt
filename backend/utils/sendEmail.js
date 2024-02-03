import nodemailer from "nodemailer";

const sendEmail = async(req, res) =>{
    // transport provide by mailtrap while using nodemailer
    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        }
    });
    // prepare a message 
    const message = {
        from : `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to : options.email,
        subject : options.subject,
        html : options.message
    }

    await transport.sendMail(message);
}

export default sendEmail;