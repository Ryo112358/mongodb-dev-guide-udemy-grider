const assert = require('assert');

const User = require('../src/model/user');

describe('Updating single record –', () => {
  let neal;

  let updateTestId = 1;

  // --- Helper ------------------------
  /* Performs same asserts as first it() test */
  function assert_recordCountOne_nameNealCaffrey(persist, done) {
    persist
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0]['name'] === 'Neal Caffrey');
        done();
      });
  }

  beforeEach((done) => {
    neal = new User({ name: 'Neal', postCount: 6 });
    neal.save()
      // .then(() => User.find({}))
      // .then((users) => console.log('----- UPDATE SINGLE', updateTestId,'-----\n', users))
      .then(() => {
        ++updateTestId;
        done();
      });
  });

  // --- Tests -------------------------

  it('instance type using set & save', (done) => {
    // console.log('Before set:', neal, '\n');
    neal.set('name', 'Neal Caffrey'); // Changes 'name' in-memory; to be persisted
    // neal.markModified('name');
    // console.log('After set:', neal,'\n');

    // Why is save() adding a new versioned document instead of overwriting previous???
    neal.save()
      .then(() => User.find({}))
      .then((users) => {
        console.log(users);
        assert(users.length === 1);
        assert(users[0]['name'] === 'Neal Caffrey');
        done();
      });
  });

  it('instance type using update', (done) => {
    assert_recordCountOne_nameNealCaffrey(neal.updateOne({ name: 'Neal Caffrey' }), done);
  });

  it('class type using update', (done) => {
    assert_recordCountOne_nameNealCaffrey(
      User.updateMany({ name: 'Neal' }, { name: 'Neal Caffrey' }),
      done
    );
  });

  it('class type updating one record', (done) => {
    assert_recordCountOne_nameNealCaffrey(
      User.findOneAndUpdate(
        { name: 'Neal' },
        { name: 'Neal Caffrey' },
        { useFindAndModify: false }
      ),
      done
    );
  });

  it('class type updating record found by id', (done) => {
    assert_recordCountOne_nameNealCaffrey(
      User.findByIdAndUpdate(neal._id, { name: 'Neal Caffrey' }, { useFindAndModify: false }),
      done
    );
  });

  it('increment user post count by 1', (done) => {
    User.updateOne({ name: 'Neal' }, { $inc: { postCount: 1 }})
      .then(() => User.find({ name: 'Neal' }))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0]['postCount'] === 7);
        done();
      });
  });

});