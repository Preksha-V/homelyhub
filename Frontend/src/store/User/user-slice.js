// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
// name: "user",
// initialState: {
// isAuthenticated:false,
// loading:false,
// user:null,
// errors:null,
// success:false
// },
// reducers: {
// getSignupRequest(state) {
// state.loading = true;
// },
// getSignupDetails(state,action) {
// state.user= action.payload;
// state.isAuthenticated= true;
// state.loading=false
// },
// getLoginRequest(state) {
// state.loading = true
// },
// getLoginDetails (state, action) {
// state.user = action.payload;
// state.isAuthenticated= true;
// state.loading = false
// },
// getError(state, action) {
// state.errors = action.payload;
// state.loading = false;
// },
// getCurrentUserRequest(state){
// state.loading = true;
// },
// getUpdateUserRequest(state) {
// state.loading = true
// },
// getCurrentUser(state, action){
// state.user = action.payload;
// state.isAuthenticated = true;
// state.loading = false;
// },
// getLogoutRequest(state) {
// state.loading = true;
// },
// getLogout(state, action) {
// state.user = action.payload;
// state.isAuthenticated= false;
// state.loading= false
// },
// getPasswordRequest(state) {
// state.loading = true;
// },
// getPasswordSuccess (state, action) {
// state.success= action.payload;
// state.errors= null;
// }
// }
// }
// );

// export const userAction = userSlice.actions;
// export default userSlice;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateUser: (state, action) => {
      state.currentUser = action.payload;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
