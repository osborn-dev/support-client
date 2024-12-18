import axios from 'axios' // Import axios for making HTTP requests

const API_URL = '/api/tickets/' // Base URL for ticket-related API endpoints

// Create a new ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Attach user token for authorization
    },
  }

  const response = await axios.post(API_URL, ticketData, config) // POST request to create a ticket
  return response.data // Return response data
}

// Fetch all user tickets
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Attach user token for authorization
    },
  }

  const response = await axios.get(API_URL, config) // GET request to fetch all tickets
  return response.data // Return response data
}

// Fetch a single user ticket
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Attach user token for authorization
    },
  }

  const response = await axios.get(API_URL + ticketId, config) // GET request for a specific ticket
  return response.data // Return response data
}

// Close a ticket
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Attach user token for authorization
    },
  }

  const response = await axios.put(
    API_URL + ticketId, // PUT request to update the ticket
    { status: 'closed' }, // Send status update in the request body
    config
  )
  return response.data // Return response data
}

const ticketService = {
  createTicket, // Create a new ticket
  getTickets, // Get all tickets
  getTicket, // Get a specific ticket
  closeTicket, // Close a ticket
}

export default ticketService // Export the service for use in other parts of the app
