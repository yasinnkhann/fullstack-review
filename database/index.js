const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher2');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  _id: Number, // id
  repoName: String, // name
  username: String, // owner.login
  userId: Number, // owner.id
  githubUrl: String, // owner.url
  reposUrl: String, // owner.repos_url
  repoUrl: String, // html_url
  forkCount: Number, // forks_count
  starCount: Number, // stargazers_count
  watcherCount: Number // watchers_count
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;