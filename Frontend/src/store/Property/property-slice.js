// import {createslice} from "@reduxjs/toolkit"

// const propertyslice = createslice({
// name: "property",
// initialState:{
// properties:[],
// totalProperties:0,
// searchParams: {},
// error:null,
// loading: false
// },
// reducers:{
// getRequest(state) {
// state. loading = true
// },
// getProperties(state,action){
// state.properties= action.payload.data;
// state.totalProperties= action.payload.all_properties;
// state.loading= false;
// },
// updateSearchParams: (state,action) =>{
// state.searchParams = Object.keys(action.payload).length === 0 ?{}: {
//     ...state.searchParams,
//     ...action.payload
// }
// },
// getErrors(state, action) {
// state.error= action.payload
// }
// }
// })

// export const propertyAction = propertyslice.actions;
// export default propertyslice

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  properties: [],
  currentProperty: null,
  loading: false,
  error: null
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    fetchPropertiesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPropertiesSuccess: (state, action) => {
      state.loading = false;
      state.properties = action.payload;
      state.error = null;
    },
    fetchPropertiesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentProperty: (state, action) => {
      state.currentProperty = action.payload;
    },
    clearCurrentProperty: (state) => {
      state.currentProperty = null;
    }
  }
});

export const {
  fetchPropertiesStart,
  fetchPropertiesSuccess,
  fetchPropertiesFailure,
  setCurrentProperty,
  clearCurrentProperty
} = propertySlice.actions;

export default propertySlice.reducer;
