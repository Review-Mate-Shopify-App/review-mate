const { createTransport } = require('nodemailer');


const transporter = createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: "saileshv@gluelabs.com",
        pass: "k5QR2ftrHZ9PDV8q",
    },
});



async function sendEmail({ receiverEmail, subject, htmlBody }) {

    const mailOptions = {
        from: 'saileshv@gluelabs.com',
        to: receiverEmail,
        subject: subject,
        html: htmlBody,

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent successfully: ' + info.response);
        }
    });
}

export default sendEmail;