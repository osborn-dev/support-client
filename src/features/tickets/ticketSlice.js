import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'
import { extractErrorMessage } from '../../utils' // Utility function for error handling

// Initial state for tickets
const initialState = {
  tickets: null, // List of tickets
  ticket: null,  // Single ticket details
}

// Create a new ticket
export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token // Get token from auth state
      return await ticketService.createTicket(ticketData, token) // Call service function
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error)) // Handle errors
    }
  }
)

// Fetch all user tickets
export const getTickets = createAsyncThunk(
  'tickets/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token // Get token from auth state
      return await ticketService.getTickets(token) // Call service function
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error)) // Handle errors
    }
  }
)

// Fetch a single ticket by ID
export const getTicket = createAsyncThunk(
  'tickets/get',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token // Get token from auth state
      return await ticketService.getTicket(ticketId, token) // Call service function
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error)) // Handle errors
    }
  }
)

// Close a ticket
export const closeTicket = createAsyncThunk(
  'tickets/close',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token // Get token from auth state
      return await ticketService.closeTicket(ticketId, token) // Call service function
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error)) // Handle errors
    }
  }
)

// Ticket slice definition
export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  extraReducers: (builder) => {
    builder
      // Handle pending state for fetching tickets
      .addCase(getTickets.pending, (state) => {
        state.ticket = null // Clear single ticket during list fetch
      })
      // Handle fulfilled state for fetching tickets
      .addCase(getTickets.fulfilled, (state, action) => {
        state.tickets = action.payload // Populate tickets array
      })
      // Handle fulfilled state for fetching a single ticket
      .addCase(getTicket.fulfilled, (state, action) => {
        state.ticket = action.payload // Set single ticket details
      })
      // Handle fulfilled state for closing a ticket
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.ticket = action.payload // Update single ticket details
        // Update the corresponding ticket in the tickets list
        state.tickets = state.tickets.map((ticket) =>
          ticket._id === action.payload._id ? action.payload : ticket
        )
      })
  },
})

export default ticketSlice.reducer // Export the reducer for use in the store
