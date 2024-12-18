import axios from 'axios'; // Import Axios for making API requests

const API_URL = '/api/users/'; // Define the base URL for user API endpoints

// Register user
const register = async (userData) => {
  try {
    // Send a POST request to the API_URL with user data
    const response = await axios.post(API_URL, userData);

    // Check if there's data in the response
    if (response.data) {
      // Store the user data in local storage (assuming it contains an authentication token)
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle any errors during the request (optional)
    console.error('Error registering user:', error);
    throw error; // Re-throw the error for handling in the calling code
  }
};

// Login user
const login = async (userData) => {
  try {
    // Send a POST request to the API_URL with login credentials
    const response = await axios.post(API_URL + 'login', userData);

    // Check if there's data in the response
    if (response.data) {
      // Store the user data in local storage
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle any errors during the request (optional)
    console.error('Error logging in user:', error);
    throw error; // Re-throw the error for handling in the calling code
  }
};

// Logout user
const logout = () => {
  // Remove the user data from local storage
  localStorage.removeItem('user');
};

// Create an object to group these functions
const authService = {
  register,
  login,
  logout,
};

export default authService; // Export the object containing the service functions