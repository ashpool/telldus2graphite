function path () {
	return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

module.exports = {path: path};
