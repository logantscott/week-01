const fs = require('fs').promises;
const { mkdirp, writeJSON, readJSON, readDirectoryJSON } = require('../lib/file-system.js');

jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(() => Promise.resolve()),
    writeFile: jest.fn(() => Promise.resolve()),
    readFile: jest.fn(() => Promise.resolve('{"name":"spot"}'))
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

    // return writeJSON('./test.json', dog)
    //   .then()
    expect(fs.writeFile)
      .toHaveBeenCalledWith('./test.json', JSON.stringify(dog));
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
});
