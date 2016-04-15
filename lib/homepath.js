module.exports = {
  path: function path() {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
  }
};
