const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect('mongodb://localhost/fetcher', options);

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  _id: Number, // id
  // repoId: Number, // id
  repoName: String, // name
  username: String, // owner.login
  userId: Number, // owner.id
  githubUrl: String, // owner.url
  reposUrl: String, // owner.repos_url
  repoUrl: String, // html_url
  forkCount: Number, // forks_count
  starCount: Number, // stargazers_count
  watchCount: Number, // watchers_count
});


const Repo = mongoose.model('Repo', repoSchema);

// Repo.init();

const save = async (repos, cb) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  try {
    for (const repo of repos) {
      const editedRepo = {
        _id: repo.id,
        repoName: repo.name,
        username: repo.owner.login,
        userId: repo.owner.id,
        githubUrl:repo.owner.url,
        reposUrl: repo.owner.repos_url,
        repoUrl: repo.html_url,
        forkCount: repo.forks_count,
        starCount: repo.stargazers_count,
        watchCount:repo.watchers_count
      };
      const freshRepo = new Repo(editedRepo);
      await freshRepo.save();
      savedRepos.push(freshRepo);
    }
    cb(null, repos);
  } catch (err) {
    if (err.code = 11000) {
      cb(null, 'duplicates');
    } else {
      cb(err, null);
    }
  }
}

module.exports.save = save;