const axios = require('axios');
const config = require('../config.js');

const getReposByUsername = async (username, cb) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  try {
    const res = await axios.get(`https://api.github.com/users/${username}/repos`, options);
    console.log(res.data);
    cb(null, res.data);
  } catch (err) {
    console.error(err);
    cb(err, null);
  }

}

module.exports.getReposByUsername = getReposByUsername;