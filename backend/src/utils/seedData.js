import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Property } from '../Models/PropertyModel.js';
import { User } from '../Models/userModel.js';

dotenv.config({ path: './config.env' });

// Sample properties data
const sampleProperties = [
  {
    propertyName: 'Olive Inn',
    description: 'A cozy inn located in the heart of Chennai',
    propertyType: 'Guest House',
    roomType: 'Entire Home',
    maximumGuest: 4,
    price: 3000,
    address: {
      area: 'T Nagar',
      city: 'chennai',
      state: 'Tamil Nadu',
      pincode: 600017
    },
    amenities: [
      { name: 'Wifi', icon: '📶' },
      { name: 'Kitchen', icon: '🍳' },
      { name: 'Ac', icon: '❄️' }
    ],
    images: [
      { url: 'https://via.placeholder.com/800x600?text=Olive+Inn+1', public_id: 'olive1' },
      { url: 'https://via.placeholder.com/800x600?text=Olive+Inn+2', public_id: 'olive2' },
      { url: 'https://via.placeholder.com/800x600?text=Olive+Inn+3', public_id: 'olive3' },
      { url: 'https://via.placeholder.com/800x600?text=Olive+Inn+4', public_id: 'olive4' },
      { url: 'https://via.placeholder.com/800x600?text=Olive+Inn+5', public_id: 'olive5' },
      { url: 'https://via.placeholder.com/800x600?text=Olive+Inn+6', public_id: 'olive6' }
    ]
  },
  {
    propertyName: 'Carnival Luxury Apartments',
    description: 'Luxurious beachfront apartments in Goa',
    propertyType: 'Flat',
    roomType: 'Entire Home',
    maximumGuest: 6,
    price: 1200,
    address: {
      area: 'Baga Beach',
      city: 'goa',
      state: 'Goa',
      pincode: 403516
    },
    amenities: [
      { name: 'Wifi', icon: '📶' },
      { name: 'Pool', icon: '🏊' },
      { name: 'Ac', icon: '❄️' },
      { name: 'Tv', icon: '📺' }
    ],
    images: [
      { url: 'https://via.placeholder.com/800x600?text=Carnival+1', public_id: 'carnival1' },
      { url: 'https://via.placeholder.com/800x600?text=Carnival+2', public_id: 'carnival2' },
      { url: 'https://via.placeholder.com/800x600?text=Carnival+3', public_id: 'carnival3' },
      { url: 'https://via.placeholder.com/800x600?text=Carnival+4', public_id: 'carnival4' },
      { url: 'https://via.placeholder.com/800x600?text=Carnival+5', public_id: 'carnival5' },
      { url: 'https://via.placeholder.com/800x600?text=Carnival+6', public_id: 'carnival6' }
    ]
  },
  {
    propertyName: 'Munnar Farmhouse',
    description: 'Experience nature at its best in Munnar',
    propertyType: 'House',
    roomType: 'Entire Home',
    maximumGuest: 8,
    price: 2800,
    address: {
      area: 'Pallivasal',
      city: 'munnar',
      state: 'Kerala',
      pincode: 685612
    },
    amenities: [
      { name: 'Wifi', icon: '📶' },
      { name: 'Kitchen', icon: '🍳' },
      { name: 'Free Parking', icon: '🅿️' }
    ],
    images: [
      { url: 'https://via.placeholder.com/800x600?text=Munnar+1', public_id: 'munnar1' },
      { url: 'https://via.placeholder.com/800x600?text=Munnar+2', public_id: 'munnar2' },
      { url: 'https://via.placeholder.com/800x600?text=Munnar+3', public_id: 'munnar3' },
      { url: 'https://via.placeholder.com/800x600?text=Munnar+4', public_id: 'munnar4' },
      { url: 'https://via.placeholder.com/800x600?text=Munnar+5', public_id: 'munnar5' },
      { url: 'https://via.placeholder.com/800x600?text=Munnar+6', public_id: 'munnar6' }
    ]
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log('✅ Database connected');

    // Clear existing data
    await Property.deleteMany({});
    console.log('🗑️  Cleared properties');

    // Insert sample properties
    await Property.insertMany(sampleProperties);
    console.log('✅ Sample properties added');

    console.log('🎉 Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
