// import { OAuth2Client } from 'google-auth-library';
const { OAuth2Client } = require('google-auth-library');
const myOAuth2Client = new OAuth2Client(process.env.GOOGLE_MAILER_CLIENT_ID, process.env.GOOGLE_MAILER_CLIENT_SECRET);
myOAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
});

module.exports = myOAuth2Client;
