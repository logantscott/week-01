const fs = require('fs').promises;

const mkdirp = (path) => {
  return fs.mkdir(path, { recursive: true });
};

module.exports = {
  mkdirp
};
