
const { assert } = require('chai');
const fixtures = require('./fixtures.json');

const { versions } = fixtures;

// eslint-disable-next-line no-undef
suite('Index tests suit', () => {
  // eslint-disable-next-line no-undef
  test('first test', () => {
    console.log(versions);
    assert.equal(true, true);
  });
});
