import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' // Import Redux Toolkit functions
import noteService from './noteService' // Import note service functions
import { extractErrorMessage } from '../../utils' // Import utility for error extraction

// Initial state for notes
const initialState = {
  notes: null, // Notes start as null (no data yet)
}

// Async thunk to fetch notes for a ticket
export const getNotes = createAsyncThunk(
  'notes/getAll', // Action type
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token // Get token from state
      return await noteService.getNotes(ticketId, token) // Call the noteService to fetch notes
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error)) // Return error message on failure
    }
  }
)

// Async thunk to create a new note
export const createNote = createAsyncThunk(
  'notes/create', // Action type
  async ({ noteText, ticketId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token // Get token from state
      return await noteService.createNote(noteText, ticketId, token) // Call the noteService to create a note
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error)) // Return error message on failure
    }
  }
)

// Note slice to manage state and reducers
export const noteSlice = createSlice({
  name: 'note', // Slice name
  initialState, // Initial state
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.notes = null // Reset notes to null while fetching
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.notes = action.payload // Update state with fetched notes
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload) // Add the new note to the notes array
      })
  },
})

export default noteSlice.reducer // Export the reducer for the store
