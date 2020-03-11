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
    .then(contents => JSON.parse(contents));
};

const readDirectoryJSON = (path) => {
  return fs.readdir(path)
    .then(files => {
      return Promise.all(files.map(file => readJSON(`${path}/${file}`)));
    })
    .then(fileContents => {
      console.log(fileContents);
    });
};

const updateJSON = (path, obj) => {
  return readJSON(path)
    .then(json => {
      const updatedJSON = { ...json, ...obj };
      return writeJSON(path, updatedJSON);
    });
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
