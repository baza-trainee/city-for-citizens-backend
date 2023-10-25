const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function sendActivationMail(to, link) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Activation account on ' + process.env.API_URL,
      text: '',
      html: `
                    <div>
                        <h1>For activate your account click link below</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
    });
  } catch (error) {
    console.error('Error sending email', error);
  }
}

module.exports = {
  sendActivationMail,
};
