// import a9a from 'express';
// import {
//     check,
//     forgotPassword,
//     login,
//     logout,
//     protect,
//     resetPassword,
//     signup,
//     updateMe,
//     updatePassword
// } from '../controllers/authController.js';
// import {
//     createProperty,
//     getUsersProperties
// } from '../controllers/propertyController.js';
// const router = a9a['Router']();
// router['route']('/signup')['post'](signup), router['route']('/login')['post'](login), router['route']('/logout')['get'](logout), router['route']('/updateMe')['patch'](protect, updateMe), router['route']('/updateMyPassword')['patch'](protect, updatePassword), router['route']('/forgotPassword')['post'](forgotPassword), router['route']('/resetPassword/:token')['patch'](resetPassword), router['route']('/me')['get'](protect, check), router['route']('/newAccommodation')['post'](protect, createProperty), router['route']('/myAccommodation')['get'](protect, getUsersProperties);
// export {
//     router
// };

import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../Models/userModel.js';

const router = express.Router();

// Sign JWT Token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Create and send token
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  
  res.cookie('jwt', token, cookieOptions);
  
  user.password = undefined;
  
  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user }
  });
};

// Register User
router.post('/register', async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      phoneNumber: req.body.phoneNumber
    });
    
    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(400).json({ 
      status: 'fail', 
      message: err.message 
    });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password'
      });
    }
    
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }
    
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({ 
      status: 'fail', 
      message: err.message 
    });
  }
});

// Get User Profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        status: 'fail', 
        message: 'User not found' 
      });
    }
    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'fail', 
      message: err.message 
    });
  }
});

// Update User
router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return res.status(404).json({ 
        status: 'fail', 
        message: 'User not found' 
      });
    }
    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (err) {
    res.status(400).json({ 
      status: 'fail', 
      message: err.message 
    });
  }
});

// Logout
router.get('/logout', (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
});

export default router;

