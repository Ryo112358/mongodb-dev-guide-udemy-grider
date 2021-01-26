const assert = require('assert');
const User = require('../src/model/user');

describe(('Subdocuments'), () => {

  it('can create a subdocument', (done) => {
    const neal = new User({ name: 'Neal', posts: [{ title: 'Lockpicking 101' }] });
    neal.save()
      .then(() => User.findOne({ name: 'Neal' }))
      .then((user) => {
        assert(user.posts[0].title === 'Lockpicking 101');
        done();
      });
  });

  it('can add subdocuments to an existing user', () => {
    const neal = new User({ name: 'Neal', posts: [] });

    neal.save()
      .then(() => User.findOne({ name: 'Neal' }))
      .then((user) => {
        user.posts.push({ title: 'The Perfect Heist' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Neal' }))
      .then((user) => {
        assert(user.posts[0].title === 'The Perfect Heist');
        done();
      });
  });
});