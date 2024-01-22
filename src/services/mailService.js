const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function sendMail(to, subject, templatePath, templateData) {
  try {
    const source = fs.readFileSync(path.join(__dirname, templatePath), 'utf8');

    const compiledTemplate = handlebars.compile(source);

    const htmlContent = compiledTemplate(templateData);

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text: '',
      html: htmlContent,
    });
  } catch (error) {
    console.error('Error sending email', error);
  }
}

module.exports = {
  sendMail,
};
