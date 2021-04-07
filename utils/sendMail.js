const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const {
  MAILSERVICE_CLIENT_ID,
  MAILSERVICE_CLIENT_SECRET_ID,
  MAILSERVICE_REFRESH_TOKEN,
  EMAIL_FROM,
  AUTH_PLAYGRUOND,
} = process.env;

const oauth2Client = new OAuth2(
  MAILSERVICE_CLIENT_ID,
  MAILSERVICE_CLIENT_SECRET_ID,
  MAILSERVICE_REFRESH_TOKEN,
  AUTH_PLAYGRUOND
);

const sendMail = (to, url, content) => {
  oauth2Client.setCredentials({
    refresh_token: MAILSERVICE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();

  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: EMAIL_FROM,
      clientId: MAILSERVICE_CLIENT_ID,
      clientSecret: MAILSERVICE_CLIENT_SECRET_ID,
      refreshToken: MAILSERVICE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const emailData = {
    from: EMAIL_FROM,
    to: to,
    subject: 'Auth App',
    html: `
      <h1>Use the following to activate your account</h1>
      <hr />
      <a href=${url}>${content}</a>
      <hr />
      <div>${url}</div>
    `,
  };

  smtpTransport.sendMail(emailData, (error, info) => {
    if (error) return error;
    return info;
  });
};

module.exports = sendMail;
