// import { configureStore } from "@reduxjs/toolkit";
// import propertySlice from "./Property/property-slice";
// import propertyDetailsSlice from "./PropertyDetails/propertyDetails-slice";
// import userSlice from "./User/user-slice";
// const store= configureStore({
//     reducer:{
//         properties: propertySlice.reducer,
//         propertyDetails : propertyDetailsSlice.reducer,
//         user : userSlice.reducer

//     }
// })
// export default store;

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import propertyReducer from './propertySlice';
import bookingReducer from './bookingSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    property: propertyReducer,
    booking: bookingReducer
  }
});

export default store;
