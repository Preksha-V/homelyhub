// import a8a from 'express';
// import {
//     getProperties,
//     getProperty
// } from '../controllers/propertyController.js';
// const propertyRouter = a8a['Router']();
// propertyRouter['route']('/')['get'](getProperties), propertyRouter['route']('/:id')['get'](getProperty);
// export {
//     propertyRouter
// };

import express from 'express';
import { Property } from '../Models/PropertyModel.js';

const router = express.Router();

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json({
      status: 'success',
      results: properties.length,
      data: { properties }
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// Get single property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ status: 'fail', message: 'Property not found' });
    }
    res.status(200).json({
      status: 'success',
      data: { property }
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// Create new property
router.post('/', async (req, res) => {
  try {
    const newProperty = await Property.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { property: newProperty }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// Update property
router.patch('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!property) {
      return res.status(404).json({ status: 'fail', message: 'Property not found' });
    }
    res.status(200).json({
      status: 'success',
      data: { property }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// Delete property
router.delete('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ status: 'fail', message: 'Property not found' });
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// Search properties by city
router.get('/search/:city', async (req, res) => {
  try {
    const city = req.params.city.toLowerCase().replaceAll(' ', '');
    const properties = await Property.find({ 'address.city': city });
    res.status(200).json({
      status: 'success',
      results: properties.length,
      data: { properties }
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

export default router;
