import { Property } from '../Models/PropertyModel.js';

// Get all properties with filtering
export const getAllProperties = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    let query = Property.find(JSON.parse(queryStr));
    
    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    
    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    
    query = query.skip(skip).limit(limit);
    
    const properties = await query;
    
    res.status(200).json({
      status: 'success',
      results: properties.length,
      data: { properties }
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get property statistics
export const getPropertyStats = async (req, res) => {
  try {
    const stats = await Property.aggregate([
      {
        $group: {
          _id: '$propertyType',
          numProperties: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      }
    ]);
    
    res.status(200).json({
      status: 'success',
      data: { stats }
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Search properties by multiple filters
export const searchProperties = async (req, res) => {
  try {
    const { city, minPrice, maxPrice, guests, propertyType } = req.query;
    
    const filter = {};
    
    if (city) {
      filter['address.city'] = city.toLowerCase().replaceAll(' ', '');
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }
    
    if (guests) {
      filter.maximumGuest = { $gte: parseInt(guests) };
    }
    
    if (propertyType) {
      filter.propertyType = propertyType;
    }
    
    const properties = await Property.find(filter);
    
    res.status(200).json({
      status: 'success',
      results: properties.length,
      data: { properties }
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default {
  getAllProperties,
  getPropertyStats,
  searchProperties
};
