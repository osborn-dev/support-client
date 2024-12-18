import { useState } from 'react' 
import { toast } from 'react-toastify' 
import { useNavigate } from 'react-router-dom' 
import { FaSignInAlt } from 'react-icons/fa' 
import { useSelector, useDispatch } from 'react-redux' 
import { login } from '../features/auth/authSlice' 
import Spinner from '../components/Spinner' 

function Login() { 
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
  })

  const { email, password } = formData // Destructuring state to access individual values

  const dispatch = useDispatch() // dispatch function for Redux actions
  const navigate = useNavigate() // navigate function for programmatic navigation

  const { isLoading } = useSelector((state) => state.auth) // Extracting the loading state from Redux auth slice

  const onChange = (e) => { 
    setFormData((prevState) => ({ // Updating the state with the new input value
      ...prevState, // Spreading the previous state to retain other field values
      [e.target.name]: e.target.value, // Setting the value of the input field dynamically
    }))
  }

  const onSubmit = (e) => { 
    e.preventDefault() // Preventing the default form submission behavior

    const userData = { // Creating an object with form data for submission
      email, 
      password, 
    }

    dispatch(login(userData)) // Dispatching the login action with user data
      .unwrap() // Unwrapping the action to handle fulfilled and rejected states
      .then((user) => { // Handling the success state of the login action
        toast.success(`Logged in as ${user.name}`) // Showing a success message with the user's name
        navigate('/') // Navigating to the home page on successful login
      })
      .catch(toast.error) // Showing an error message on login failure
  }

  if (isLoading) { // Checking if the loading state is true
    return <Spinner /> // Rendering the Spinner component if loading is in progress
  }

  return ( 
    <>
      <section className='heading'> 
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please log in to get support</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}> 
          <div className='form-group'>
            <input
              type='email' 
              className='form-control' 
              id='email' 
              name='email' 
              value={email} 
              onChange={onChange} 
              placeholder='Enter your email' 
              required 
            />
          </div>
          <div className='form-group'> 
            <input
              type='password' 
              className='form-control' 
              id='password' 
              name='password' 
              value={password} 
              onChange={onChange} 
              placeholder='Enter password' 
              required 
            />
          </div>
          <div className='form-group'> 
            <button className='btn btn-block'>Submit</button> 
          </div>
        </form>
      </section>
    </>
  )
}

export default Login 
