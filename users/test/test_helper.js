const mongoose =  require('mongoose');

const User = require('../src/model/user');

/* before() and beforeEach() provided by Mocha, but how? */
// This before() prevents test execution until connection to Mongo is successful
before((done) => {
  mongoose.connect('mongodb://localhost:27017/users_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning:', error)
    });
});

/* --- done() callback --- [part of mocha]
 * Before calling each describe() in test suite,
 * perform below steps and continue only when done with steps.
 */
beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    User.find({})
      .then((users) => {
        console.log('--------- Test_helper ------------\n', users);
        done();
      });
    // Drop collection is complete. Ready to run next test!
    // done();
  });
});