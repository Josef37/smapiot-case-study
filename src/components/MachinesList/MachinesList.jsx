import React from 'react'
import MachineListItem from './MachineListItem'

const MachinesList = ({ machines }) => {
  return (
    <ul style={{ height: "90vh", overflowY: "auto" }}>{
      machines.map(machine =>
        <li key={machine.id}>
          <MachineListItem {...machine} />
        </li>
      )
    }</ul>
  )
}

export default MachinesList
