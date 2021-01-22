import React from 'react'
import MachineListItem from './MachineListItem'
import List from '@material-ui/core/List'

const MachinesList = ({ machines }) => {
  return (
    <List>{
      machines.map(machine =>
        <MachineListItem key={machine.id} {...machine} />
      )
    }</List>
  )
}

export default MachinesList
