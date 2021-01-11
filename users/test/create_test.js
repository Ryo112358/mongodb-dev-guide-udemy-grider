const assert = require('assert'); // Included in Mocha

const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', () => {
    const neal = new User({ name: 'Neal Caffrey' });  // 1. Create an instance of model
    
    neal.save()                                       // 2. Save created instance to db
      .then(() => {
        // 3. Confirm record in db, i.e. has neil been saved?
        assert(!neal.isNew);
        // done(); // How does done() know to execute the collection drop located in the test_helper.js file???
      });
    
  });

  it('saves multiple users', () => {
    const mozzie = new User({ name: 'Teddy Winters' });
    const peter = new User({ name: 'Peter Burke' });
    
    mozzie.save()
      .then(() => {
        peter.save()
          .then(() => {
            assert(!mozzie.isNew && !peter.isNew);
          });
      });
  });
  
});