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
