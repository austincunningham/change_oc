
const { assert } = require('chai');
const mock = require('mock-fs');
const { beforeEach, afterEach } = require('mocha');
const fixtures = require('./fixtures.json');


const { versions } = fixtures;

// eslint-disable-next-line no-undef
suite('Index tests suit', () => {
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    mock({
      '/opt/': {
        'empty-dir': {/** empty directory */},
      },
    });
  });

  // eslint-disable-next-line no-undef
  afterEach(() => {
    mock.restore();
  });

  // eslint-disable-next-line no-undef
  test('first test', () => {
    console.log(versions);
    assert.equal(true, true);
  });
});
