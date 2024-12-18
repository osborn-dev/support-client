import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'

function Tickets() {
  const { tickets } = useSelector((state) => state.tickets) // Accessing tickets from Redux state

  const dispatch = useDispatch() // Hook to dispatch actions to Redux store

  useEffect(() => {
    dispatch(getTickets()) // Dispatch action to fetch tickets when the component mounts
  }, [dispatch]) // Re-run effect when dispatch changes (this ensures the effect runs only once)

  if (!tickets) {
    return <Spinner /> // Show a loading spinner if tickets data is not yet available
  }

  return (
    <>
      <BackButton /> 
      <h1>Tickets</h1> 
      <div className='tickets'> 
        <div className='ticket-headings'> 
          <div>Date</div> 
          <div>Product</div> 
          <div>Status</div> 
          <div></div> 
        </div>
        {tickets.map((ticket) => ( // Mapping through tickets to render each ticket item
          <TicketItem key={ticket._id} ticket={ticket} /> // Render each ticket item, passing ticket as a prop
        ))}
      </div>
    </>
  )
}


export default Tickets
