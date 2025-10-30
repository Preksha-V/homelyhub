import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import propertyRouter from './routes/propertyRouter.js';
import userRouter from './routes/userRoutes.js';
import bookingRouter from './routes/bookingRouter.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Debug: Print environment variables
console.log('\n📋 Environment Variables Check:');
console.log('PORT:', process.env.PORT);
console.log('DATABASE_URI:', process.env.DATABASE_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');
console.log('');

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
const connectDB = async () => {
  try {
    const dbUri = process.env.DATABASE_URI;
    
    if (!dbUri) {
      throw new Error('❌ DATABASE_URI is not defined in .env file');
    }
    
    console.log('🔄 Connecting to MongoDB...');
    console.log('📍 URI:', dbUri);
    
    await mongoose.connect(dbUri);
    
    console.log('✅ MongoDB Connected Successfully');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
    console.log('');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.error('');
    console.error('💡 Troubleshooting:');
    console.error('   1. Check if .env file exists in backend/ folder');
    console.error('   2. Verify DATABASE_URI in .env:');
    console.error('      DATABASE_URI=mongodb://localhost:27017/mongodb');
    console.error('   3. Make sure MongoDB is running locally');
    console.error('');
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Routes
app.use('/api/properties', propertyRouter);
app.use('/api/users', userRouter);
app.use('/api/bookings', bookingRouter);

// Test Route
app.get('/', (req, res) => {
  res.json({ 
    message: 'HomelyHub API is running!',
    status: 'success',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    server: 'running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    databaseName: mongoose.connection.name,
    timestamp: new Date().toISOString()
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('🚀 HomelyHub Server Started');
  console.log('='.repeat(60));
  console.log('📍 Server URL: http://localhost:' + PORT);
  console.log('💚 Health Check: http://localhost:' + PORT + '/api/health');
  console.log('🏠 Properties API: http://localhost:' + PORT + '/api/properties');
  console.log('='.repeat(60));
  console.log('');
});
