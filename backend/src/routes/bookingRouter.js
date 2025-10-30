// import a7a from 'express';
// const bookingRouter = a7a['Router']();
// import {
//     getUserBookings,
//     getBookingDetails,
//     createOrder,
//     verifyPayment
// } from '../controllers/bookingController.js';
// import { protect } from '../controllers/authController.js';
// bookingRouter['get']('/', protect, getUserBookings), bookingRouter['get']('/:bookingId', protect, getBookingDetails), bookingRouter['post']('/create-order', protect, createOrder), bookingRouter['post']('/verify-payment', protect, verifyPayment);
// export {
//     bookingRouter
// };

import express from 'express';
import { Booking } from '../Models/bookingModel.js';
import { Property } from '../Models/PropertyModel.js';

const router = express.Router();

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: { bookings }
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// Get single booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ 
        status: 'fail', 
        message: 'Booking not found' 
      });
    }
    res.status(200).json({
      status: 'success',
      data: { booking }
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// Get user's bookings
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId });
    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: { bookings }
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// Create new booking
router.post('/', async (req, res) => {
  try {
    const { property, user, fromDate, toDate, guests, price, numberOfnights } = req.body;
    
    // Create booking
    const newBooking = await Booking.create({
      property,
      user,
      fromDate,
      toDate,
      guests,
      price,
      numberOfnights,
      paid: true
    });
    
    // Update property's currentBookings
    await Property.findByIdAndUpdate(property, {
      $push: {
        currentBookings: {
          bookingId: newBooking._id,
          fromDate,
          toDate,
          userId: user
        }
      }
    });
    
    res.status(201).json({
      status: 'success',
      data: { booking: newBooking }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// Cancel booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ 
        status: 'fail', 
        message: 'Booking not found' 
      });
    }
    
    // Remove from property's currentBookings
    await Property.findByIdAndUpdate(booking.property, {
      $pull: { currentBookings: { bookingId: booking._id } }
    });
    
    // Delete booking
    await Booking.findByIdAndDelete(req.params.id);
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

export default router;
