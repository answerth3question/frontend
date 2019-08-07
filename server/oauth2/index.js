const router = require('express').Router();
const axios = require('axios');

const GOOGLE_DISCOVERY_DOCUMENT = 'https://accounts.google.com/.well-known/openid-configuration';

const spitData = axiosRequest => axiosRequest.then(res => res.data).catch(err => err);

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
    // console.log(googleUser)
    res.send(googleUser);
  } catch (error) {
    console.error(error.message);
    res.send(error.message)
  }
});

module.exports = router;