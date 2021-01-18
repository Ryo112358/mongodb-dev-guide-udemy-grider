const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => { return name.length > 2 },
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  postCount: Number
});

/*
 * Notes for line below:
 *   -'user' represents the name of the collection in the current db
 *   - The collection will be created if DNE
 *   - const User represents the entirety of the records in collection 'user' 
 */
const User = mongoose.model('user', UserSchema);

module.exports = User;