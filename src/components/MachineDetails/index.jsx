import React from 'react'
import { useSelector } from 'react-redux'
import { selectMachineById } from '../../redux/slices/machines'
import MachineDetails from "./MachineDetails"

const MachineDetailsContainer = ({ id }) => {
  const machine = useSelector(state => selectMachineById(state, id))

  return machine
    ? <MachineDetails {...machine} />
    : "Loading machine details"
}

export default MachineDetailsContainer
