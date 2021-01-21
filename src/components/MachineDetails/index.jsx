import React from 'react'
import { useSelector } from 'react-redux'
import { selectMachineById } from '../../redux/slices/machines'
import { selectNotesByMachineId } from '../../redux/slices/notes'
import MachineDetails from "./MachineDetails"

const MachineDetailsContainer = ({ id }) => {
  const machine = useSelector(state => selectMachineById(state, id))
  const notes = useSelector(state => selectNotesByMachineId(state)(id))

  return machine
    ? <MachineDetails machine={machine} notes={notes} />
    : "Loading machine details"
}

export default MachineDetailsContainer
