const User = require('../models/userModel');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack});
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Public
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
     return res.status(404).json({
        success: false,
        message: "no user existed",
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack});
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.status(500).json({
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack});
    }
    res.status(500).json({
      success: false,
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack});
    }
};

// @desc    Create a user
// @route   POST /api/users
// @access  Public
const createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack});
    }
    
    const user = await User.create(req.body);
    
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
    });
  }
    
};

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Public
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
     return res.status(404).json({
        success: false,
        message: "User not found",
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack});

    }
    
    if (req.body.email && req.body.email !== user.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        res.status(400).json({
          success: false,
          message: "User with this email already exists",
          stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack});
      }
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
    });
  }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Public
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
     return res.status(404).json({
      success: false,
      message: "no user is existed",
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
    });
    }
    
    await user.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};