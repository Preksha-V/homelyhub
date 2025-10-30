import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './components/home/HomePage';
import PropertyDetails from './components/propertyListing/PropertyDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import UserProfile from './components/user/UserProfile';
import MyBookings from './components/myBookings/MyBookings';
import AddProperty from './components/accomodation/AddProperty';
import Footer from './components/common/Footer';
import './App.css';

function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#4caf50',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f44336',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/add-property" element={<AddProperty />} />
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;
