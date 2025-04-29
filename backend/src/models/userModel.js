const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, 'user name is required'],
    trim: true
  },
  interest: {
    type: [String],
    default: []
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age must be a positive number'],
    max: [120, 'Age cannot exceed 120']
  },
  mobile: {
    type: Number,
    required: [true, 'Mobile number is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);