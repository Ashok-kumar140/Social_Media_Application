import nodemailer from 'nodemailer';

export const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service:process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: process.env.USER,
                pass: process.env.PASS
            }
        });
        await transporter.sendMail({
            from: process.env.USER, // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            text: "Hello world?", // plain text body
            html: `<h2>Thanks for registering on our site</h2>
            <h4>Please verify your email...</h4>
            <a href=${text}>Verify link</a>`, // html body
          });
          console.log("Email sent successfully");
    }
    catch (err) {
        console.log(err);
        console.log("Email not sent");
    }
}