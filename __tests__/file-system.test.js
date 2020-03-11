const fs = require('fs').promises;
const { mkdirp, writeJSON, readJSON, readDirectoryJSON, updateJSON, deleteFile } = require('../lib/file-system.js');

jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(() => Promise.resolve()),
    writeFile: jest.fn(() => Promise.resolve()),
    readFile: jest.fn(() => Promise.resolve('{"name":"spot"}')),
    readdir: jest.fn(() => Promise.resolve()),
    unlink: jest.fn(() => Promise.resolve())
  }
}));

describe('file system functions', () => {
  it('makes a directory and all parent directories', () => {
    return mkdirp('./my/cool/directory/path')
      .then(() => {
        expect(fs.mkdir).toHaveBeenCalledWith('./my/cool/directory/path', { recursive: true });
      });
  });

  it('writes an object to a file', () => {
    const dog = {
      name: 'spot',
      age: 5,
      weight: '20 lbs'
    };

    return writeJSON('./test.json', dog)
      .then(data => {
        expect(fs.writeFile)
          .toHaveBeenCalledWith('./test.json', JSON.stringify(dog), { 'encoding': 'utf8' });
      });
  });

  it('can read an object from a file', () => {
    return readJSON('./test.json')
      .then(data => {
        expect(fs.readFile)
          .toHaveBeenCalledWith('./test.json', { 'encoding': 'utf8' });
        expect(data).toEqual({
          name: 'spot'
        });
      });
  });

  it('reads a directory of json', () => {
    return readDirectoryJSON('../lib/data')
      .then(data => {
        expect(fs.readdir)
          .toHaveBeenCalledWith('../lib/data');
        expect(fs.readFile)
          .toHaveBeenCalledWith('../lib/data/spot.json');
        expect(data).toEqual([
          { name: 'spot' },
          { name: 'spot ' }
        ]);
      });
  });

  it('updates a files json', () => {
    return updateJSON('./test.json', { name: 'rover' })
      .then(data => {
        expect(fs.readFile)
          .toHaveBeenCalledWith('./test.json', { 'encoding': 'utf8' });
        expect(fs.writeFile)
          .toHaveBeenCalledWith('./test.json', '{"name":"rover"}', { 'encoding': 'utf8' });
      });
  });

  it('deletes a json file', () => {
    return deleteFile('./test.json')
      .then(() => {
        expect(fs.unlink).toHaveBeenCalledWith('./test.json');
      });
  });
});
