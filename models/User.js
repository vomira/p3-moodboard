const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  displayName: String,
  profileImg: String,
  newsPreferences: [String],
  languages: [String],
  goodies: [String],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
