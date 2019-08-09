const router = require('express').Router();
const axios = require('axios')
const jwt = require('jsonwebtoken')

const GOOGLE_DISCOVERY_DOCUMENT = 'https://accounts.google.com/.well-known/openid-configuration';

const spitData = axiosPromise => axiosPromise.then(res => res.data);

router.post('/google', async (req, res) => {
  try {
    const discoveryDocument = await spitData(axios.get(GOOGLE_DISCOVERY_DOCUMENT));
    const payload = {
      code: req.body.code, // authorization code generated when user gave permission for google to share user data with AnswerTh3Question
      redirect_uri: req.body.redirect_uri,
      client_id: req.body.client_id,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      grant_type: 'authorization_code',
    };
    const googleUser = await spitData(axios.post(discoveryDocument.token_endpoint, payload));
    const decodedGoogleUser= jwt.decode(googleUser.id_token); // should ultimately use jwt.verify
    const myFlaskAppResponse = await spitData(axios.post(process.env.FLASK_API + '/auth/login?oauth2=true&strategy=google', decodedGoogleUser))
    res.send(myFlaskAppResponse);
  } catch (error) {
    console.error(error.message);
    res.send(error.message);
  }
});

module.exports = router;