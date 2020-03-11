const fs = require('fs').promises;
const { mkdirp } = require('../lib/file-system.js');

jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(() => Promise.resolve())
  }
}));

describe('file system functions', () => {
  it('makes a directory and all parent directories', () => {
    return mkdirp('./my/cool/directory/path')
      .then(() => {
        expect(fs.mkdir).toHaveBeenCalledWith('./my/cool/directory/path', { recursive: true });
      });
  });
});
