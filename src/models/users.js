const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
   email: {
      type: String,
      trim: true,
      required: [true, 'Please provide an email'],
      validate: {
         validator: val => validator.isEmail(val),
         message: props => `${props.value} is not a valid email`,
      },
      unique: true,
   },
   password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
   },
})

UserSchema.pre('save', async function (next) {
   if (!this.isModified('password')) next();

   try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;

      next();
   } catch (error) {
      next(error);
   }
});

UserSchema.methods.comparePassword = async function (password) {
   const comparison = await bcrypt.compare(password, this.password);
   return comparison;
};

module.exports = mongoose.model('User', UserSchema)