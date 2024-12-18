import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, createNote } from '../features/notes/noteSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')
function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false) // State to manage modal visibility
  const [noteText, setNoteText] = useState('') // State to manage note text input
  const { ticket } = useSelector((state) => state.tickets) // Getting ticket data from Redux state

  const { notes } = useSelector((state) => state.notes) // Getting notes data from Redux state

  const navigate = useNavigate() // Hook to navigate between routes
  const dispatch = useDispatch() // Hook to dispatch actions to Redux store
  const { ticketId } = useParams() // Extract ticketId from the route parameters

  useEffect(() => {
    dispatch(getTicket(ticketId)).unwrap().catch(toast.error) // Dispatch action to fetch ticket data
    dispatch(getNotes(ticketId)).unwrap().catch(toast.error) // Dispatch action to fetch ticket notes
  }, [ticketId, dispatch]) // Re-run effect when ticketId or dispatch changes

  // Close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId)) // Dispatch action to close the ticket
      .unwrap() 
      .then(() => {
        toast.success('Ticket Closed') 
        navigate('/tickets') // Redirect to tickets page
      })
      .catch(toast.error) // Show error message if closing ticket fails
  }

  // Create note submit
  const onNoteSubmit = (e) => {
    
    e.preventDefault()
    dispatch(createNote({ noteText, ticketId })) // Dispatch action to create a new note for the ticket
      .unwrap() // Unwrap the result of the action
      .then(() => {
        setNoteText('') // Clear the note text after submission
        closeModal() // Close the modal after submitting the note
      })
      .catch(toast.error) // Show error message if note creation fails
  }

  // Open/close modal
  const openModal = () => setModalIsOpen(true) 
  const closeModal = () => setModalIsOpen(false) 

  if (!ticket) {
    return <Spinner /> // Show a loading spinner if the ticket data is not yet available
  }


  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button onClick={openModal} className='btn'>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <Spinner />
      )}

      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className='btn btn-block btn-danger'>
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket
