import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllMachines } from '../../redux/slices/machines'
import MachinesList from "./MachinesList"

const MachinesListContainer = () => {
  const machines = useSelector(selectAllMachines)

  return <MachinesList machines={machines} />
}

export default MachinesListContainer
