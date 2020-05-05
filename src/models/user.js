const Mongoose = require('mongoose');

const ObjectID = Mongoose.Schema.Types.ObjectId;

const userSchema = Mongoose.Schema(
  {
    _id: ObjectID,
    nusp: String,
    name: String,
  },
  { collection: 'users' },
);

module.exports = Mongoose.model('users', userSchema);
