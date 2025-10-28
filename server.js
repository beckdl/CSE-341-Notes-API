const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongodb = require('./database/db');   
const bodyParser = require('body-parser');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const token = require('./utils/auth');
const axios = require('axios');

const jwtCheck = auth({
  audience: 'https://cse-341-notes-api.onrender.com',
  issuerBaseURL: 'https://dev-0o2a64jccu2dayz1.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

token.getToken();

app.use(jwtCheck);

const options = { 
  method: "GET",
  url: "https://cse-341-notes-api.onrender.com",
  headers: { "authorization": "Bearer TOKEN" },
};

axios(options)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });

app.get('/public', (req, res) => {
  res.send('Public route, no authentication required.');
});

app.get('/private', requiredScopes('read:messages'), (req, res) => {
  res.send('Private route, authentication and scope "read:messages" required.');
});

app
.use(bodyParser.json())
.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})
.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  }
});