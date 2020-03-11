const fs = require('fs').promises;

const mkdirp = (path) => {
  return fs.mkdir(path, { recursive: true });
};

const writeJSON = (path, obj) => {
  return fs.writeFile(path, JSON.stringify(obj), { encoding: 'UTF8' });
};

const readJSON = (path) => {
  return fs.readFile(path, { encoding: 'utf8' })
    .then(contents => JSON.parse(contents));
};

const readDirectoryJSON = () => {
  return fs.readdir('./data')
    .then(files => {
      return Promise.all(files.map(file => {
        return fs.readFile(`./data${file}`, { encoding: 'utf8' });
      }));
    })
    .then(fileContents => {
      console.log(fileContents);
    });
};

module.exports = {
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON
};
