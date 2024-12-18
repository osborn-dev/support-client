import axios from 'axios' // Import Axios for HTTP requests

const API_URL = '/api/tickets/' // Base URL for ticket-related API endpoints

// Fetch notes for a specific ticket
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Add token to authorization header
    },
  }

  const response = await axios.get(API_URL + ticketId + '/notes', config) // Send GET request to fetch notes

  return response.data // Return the response data
}

// Create a new note for a specific ticket
const createNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Add token to authorization header
    },
  }

  const response = await axios.post(
    API_URL + ticketId + '/notes', // Send POST request to the notes endpoint
    { text: noteText }, // Pass the note text in the request body
    config // Include the authorization header
  )

  return response.data // Return the response data
}

// Service object to manage notes
const noteService = {
  getNotes, // Function to get ticket notes
  createNote, // Function to create a new note
}

export default noteService // Export the note service
