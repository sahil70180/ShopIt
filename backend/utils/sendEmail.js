import nodemailer from "nodemailer";

const sendEmail = async (options) =>{
    // transport provide by mailtrap while using nodemailer
    const mail = process.env.APP_MAIL
    const password = process.env.APP_PASSWORD

    var transport = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465 ,
        secure : true,  
        auth: {
          user: mail,
          pass : password
        }
    });
    const mailOptions = {
        from : `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to : options.email,
        subject : options.subject,
        html : options.message
    }

    try {
        await transport.sendMail(mailOptions);        
    } catch (error) {
        console.log("Error in Sending Mail", error);
    }

}

export default sendEmail;