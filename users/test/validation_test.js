const assert = require('assert');

const User = require('../src/user');

describe('Validating records', () => {

  it('requires a user name', (done) => {
    const userNoName = new User({ name: undefined });
    const validationResult = userNoName.validateSync();
    const message = validationResult.errors.name.message;
    // const { message } = validationResult.errors.name; // ES6 equivalent to above line

    assert(message === 'Name is required.');
    done();
  });

  it('requires user name longer than 2 characters', (done) => {
    const dr = new User({ name: 'Dr' });
    const leo = new User({ name: 'Leo' });

    const validationResult1 = dr.validateSync();
    const message1 = validationResult1.errors.name.message;
    const validationResult2 = leo.validateSync();

    assert(message1 === 'Name must be longer than 2 characters.');
    assert(validationResult2 === undefined);
    done();
  });

  it('disallows invalid records from being saved', (done) => {
    const dr = new User({ name: 'Dr' });
    dr.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 characters.');
        done();
      });
  });
  
  // it('', (done) => {});
  // it('', (done) => {});
});