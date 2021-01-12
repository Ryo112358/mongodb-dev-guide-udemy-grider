const assert = require('assert');

const User = require('../src/user');

describe('Read users from collection', () => {
  let neal;

  beforeEach((done) => {
    neal = new User({ name: 'Neal'});
    neal.save()
      .then(() => done());
  });

  it('find all users with name neal', (done) => {
    User.find({ name: 'Neal'})
      .then((users) => {
        assert(users[0]._id.toString() === neal._id.toString());
        done();
      });
  })

  it('find a user with a particular id', (done) => {
    User.findOne({ _id: neal._id })
      .then((user) => {
        assert(user.name === 'Neal');
        done();
      });
  });
});