const nodemailer = require('nodemailer')
        config = require('../config/config');


exports.sendInfoMail = function(req,res) {

    // Instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
        host: (process.env.MS_HOST || config.ms.host),
        port: (process.env.MS_PORT || config.ms.port),
        secure: true,
        auth: {
            user: (process.env.MS_USER || config.ms.user),
            pass: (process.env.MS_PASS || config.ms.pass)
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    smtpTrans.verify(function(error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    // Specify what the email will look like
    const mailOpts = {
        from: 'Dev Team at Biotork', // This is ignored by Gmail
        to: req.body.targetEmail,
        subject: 'FAQ for BioTork, LLC.', // Subject line
        text: req.body.customerMessage, // plain text body
    }

    // Attempt to send the email
    smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
            console.log('contact-failure') // Show a page indicating failure
        }
        else {
            console.log('contact-success') // Show a page indicating success
        }
    });

};

exports.sendInqMail = async function(req,res) {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: req.body.targetEmail, // sender address
        to: '"Inquiries" <contact@biotork.com>', // list of receivers
        subject: 'New inquiry from customer', // Subject line
        text: 'New inquiry', // plain text body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
