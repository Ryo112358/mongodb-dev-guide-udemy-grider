const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String
});

/*
 * Notes for line below:
 *   -'user' represents the name of the collection in the current db
 *   - The collection will be created if DNE
 *   - const User represents the entirety of the records in collection 'user' 
 */
const User = mongoose.model('user', UserSchema);

module.exports = User;