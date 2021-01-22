import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { loadMachineDetails, selectEventsByMachineId, selectMachineById } from '../../redux/slices/machines'
import { selectNotesByMachineId } from '../../redux/slices/notes'
import MachineDetails from "./MachineDetails"

const MachineDetailsContainer = ({ id }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadMachineDetails(id))
  }, [dispatch, id])

  const machine = useSelector(state => selectMachineById(state, id))
  const notes = useSelector(state => selectNotesByMachineId(state)(id))
  const events = useSelector(state => selectEventsByMachineId(state)(id))

  return machine
    ? <MachineDetails machine={machine} notes={notes} events={events} />
    : <Typography>Loading machine details</Typography>
}

export default MachineDetailsContainer
