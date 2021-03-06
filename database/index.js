const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect('mongodb://localhost/fetcher', options);

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  _id: Number,
  repoName: String,
  username: String,
  userId: Number,
  githubUrl: String,
  reposUrl: String,
  repoUrl: String,
  forkCount: Number,
  starCount: Number,
  watchCount: Number,
  createdAt: String,
  updatedAt: String,
  pushedAt: String
});

const Repo = mongoose.model('Repo', repoSchema);

const save = async (repos, cb) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  const savedRecords = [];
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
        watchCount:repo.watchers_count,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at
      };

      const freshRepo = new Repo(editedRepo);
      await freshRepo.save();
      savedRecords.push(freshRepo._doc);
    }
    cb(null, savedRecords);
  } catch (err) {
    if (err.code = 11000) {
      cb(null, savedRecords);
    } else {
      cb(err, null);
    }
  }
};

const getAllRepos = async cb => {
  try {
    const res = await Repo.find().limit(25).sort({ forkCount: -1 });
    cb(null, res);
  } catch (err) {
    cb(err, null);
  }
};

module.exports.save = save;

module.exports.getAllRepos = getAllRepos;