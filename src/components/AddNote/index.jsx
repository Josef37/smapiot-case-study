import React from 'react'
import { useDispatch } from 'react-redux'
import { addNote } from '../../redux/slices/notes'
import AddNote from './AddNote'

const AddNoteContainer = ({ machine_id }) => {
  const dispatch = useDispatch()

  const handleAdd = (content) =>
    dispatch(addNote({
      machine_id,
      content: content.trim()
    }))

  return <AddNote handleAdd={handleAdd} />
}

export default AddNoteContainer
