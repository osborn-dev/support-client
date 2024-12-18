// Import necessary components
import { Navigate } from 'react-router-dom'; // Used for redirecting users
import { useSelector } from 'react-redux'; // Used to access the Redux store

// Define a component called PrivateRoute
const PrivateRoute = ({ children }) => {
  // Get the user information from the Redux store
  const user = useSelector((state) => state.auth.user);

  // If the user is logged in (i.e., user exists)
  if (user) {
    // Return the children components, which are the components that should be protected
    return children;
  } else {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }
};

// Export the PrivateRoute component
export default PrivateRoute;