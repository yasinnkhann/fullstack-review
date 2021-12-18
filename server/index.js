const express = require('express');
const app = express();
const { getReposByUsername } = require('../helpers/github.js');
const { save, getAllRepos } = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));

app.use(express.json());

app.post('/repos', async function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const { username } = req.body;

  getReposByUsername(username, (err, repos) => {
    if (err) {
      console.error(err);
      res.status(404).json('Unable to get repos');
    } else {
      save(repos, (err, data) => {
        if (err) {
          console.error(err);
          res.status(400).json('Unable to write repos');
        } else {
          res.status(201).json(repos);
        }
      });
    }
  })

  ////////////////////////////////////////
  // try {
  //   const repos = await getReposByUsername(username)
  //   const savedRepos = await save(repos);
  //   res.status(200).json(repos);
  // } catch (err) {
  //   console.error(err);
  //   res.status(404).json('Unable to get repos');
  // }
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  getAllRepos((err, repos) => {
    if (err) {
      console.error(err);
      res.status(404).json('Could not get repos');
    } else {
      res.status(200).json(repos);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

