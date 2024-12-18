import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit' // Import functions from Redux Toolkit
import authService from './authService' // Import the authentication service

import { extractErrorMessage } from '../../utils' // Import a utility to handle error messages

// Retrieve the user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null, // Set user from localStorage if available, otherwise null
  isLoading: false, // Default loading state is false
}

// Thunk for registering a new user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user) // Call the register API
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error)) // Handle errors
  }
})

// Thunk for logging in a user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user) // Call the login API
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error)) // Handle errors
  }
})

// Action for logging out a user
export const logout = createAction('auth/logout', () => {
  authService.logout() // Clear user data via the service
  return {} // No payload needed, return an empty object
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Handle logout by clearing the user state
    logout: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Registration actions
      .addCase(register.pending, (state) => {
        state.isLoading = true // Show loading during registration
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload // Update user on successful registration
        state.isLoading = false // Stop loading
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false // Stop loading on registration failure
      })
      // Login actions
      .addCase(login.pending, (state) => {
        state.isLoading = true // Show loading during login
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload // Update user on successful login
        state.isLoading = false // Stop loading
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false // Stop loading on login failure
      })
  },
})

export default authSlice.reducer // Export the reducer
