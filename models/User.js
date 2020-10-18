const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //npm install --save mongoose-unique-validator

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // unique verifie que l'email est unique dans la base de donnée
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);