import { Booking } from '../Models/bookingModel.js';
import { Property } from '../Models/PropertyModel.js';
import moment from 'moment';

// Check availability
export const checkAvailability = async (req, res) => {
  try {
    const { propertyId, fromDate, toDate } = req.body;
    
    const property = await Property.findById(propertyId);
    
    if (!property) {
      return res.status(404).json({
        status: 'fail',
        message: 'Property not found'
      });
    }
    
    const from = moment(fromDate);
    const to = moment(toDate);
    
    const isAvailable = property.currentBookings.every(booking => {
      const bookingFrom = moment(booking.fromDate);
      const bookingTo = moment(booking.toDate);
      
      return to.isBefore(bookingFrom) || from.isAfter(bookingTo);
    });
    
    res.status(200).json({
      status: 'success',
      data: {
        available: isAvailable,
        message: isAvailable ? 'Property is available' : 'Property is not available for selected dates'
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get booking statistics
export const getBookingStats = async (req, res) => {
  try {
    const stats = await Booking.aggregate([
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: '$price' },
          avgBookingValue: { $avg: '$price' }
        }
      }
    ]);
    
    res.status(200).json({
      status: 'success',
      data: { stats: stats[0] }
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default {
  checkAvailability,
  getBookingStats
};
