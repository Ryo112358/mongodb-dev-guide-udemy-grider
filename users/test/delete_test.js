const assert = require('assert');

const User = require('../src/user');

describe('Deleting a user', () => {
  let liz;
  let diana1;
  let diana2;

  /* --- done() callback --- [part of mocha]
   * Before calling each it() in THIS decribe() suite,
   * perform below steps and continue only when done with steps.
   */
  beforeEach((done) => {
    liz = new User({ name: 'Elizabeth Burke'});
    diana1 = new User({ name: 'Diana'});
    diana2 = new User({ name: 'Diana'});

    // --- Insert 3 db records before proceding with each test
    // liz.save()
    //   .then(() => {
    //     diana1.save()
    //       .then(() => {
    //         diana2.save()
    //           .then(() => done());
    //         });
    //   });

    // A cleaner way to do the above
    liz.save()
      .then(() => diana1.save())
      .then(() => diana2.save())
      .then(() => done());
  });

  it('model instance remove', (done) => {
    liz.remove()
      .then(() => User.findOne({ name: 'Elizabeth Burke'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  /* Used to remove the first found record with given criteria */
  it('class method deleteOne Diana', (done) => {
    User.deleteOne({ name: 'Diana'})
      .then(() => User.findOne({ name: 'Diana'}))
      .then((user) => {
        assert(user.name === 'Diana');
        done();
      });
    });

  it('class method deleteOne Liz', (done) => {
    User.deleteOne({ name: 'Elizabeth Burke'})
      .then(() => User.findOne({ name: 'Elizabeth Burke'}))
      .then((user) => {
        assert(user === null);
        done();
      });
    });

    /* Used to remove multiple records with given criteria */
    it('class method deleteMany', (done) => {
      User.deleteMany({ name: 'Diana'})
        .then(() => User.findOne({ name: 'Diana'}))
        .then((user) => {
          assert(user === null);
          done();
        });
    });

});