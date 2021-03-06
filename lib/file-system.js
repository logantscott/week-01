const fs = require('fs').promises;

const mkdirp = (path) => {
  return fs.mkdir(path, { recursive: true });
};

const writeJSON = (path, obj) => {
  return fs.writeFile(path, JSON.stringify(obj), { encoding: 'utf8' })
    .then(() => obj);
};

const readJSON = (path) => {
  return fs.readFile(path, { encoding: 'utf8' })
    .then(data => JSON.parse(data));
};

const readDirectoryJSON = (path) => {
  return fs.readdir(path)
    .then(files => {
      return Promise.all(files.map(file => readJSON(`${path}/${file}`)));
    });
};

const updateJSON = (path, obj) => {
  return readJSON(path)
    .then(data => writeJSON(path, { ...data, ...obj }));
};

const deleteFile = (path) => {
  return fs.unlink(path);
};

module.exports = {
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile
};
