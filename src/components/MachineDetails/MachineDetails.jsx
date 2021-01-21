import React from 'react'
import { format, parseISO } from 'date-fns'
import AddNote from '../AddNote'
import MachinesMap from '../MachinesMap/MachinesMap'

const MachineDetails = ({ machine, notes }) => {
  const { id, status, machine_type, last_maintenance, install_date, floor } = machine
  return (
    <div>
      <div>id {id}</div>
      <div>status {status}</div>
      <div>machine_type {machine_type}</div>
      <div>last_maintenance {last_maintenance}</div>
      <div>install_date {install_date}</div>
      <div>floor {floor}</div>
      <MachinesMap
        machines={[machine]}
        mapContainerProps={{
          style: { height: 200, width: 200 },
          boundsOptions: { maxZoom: 19 },
          zoomControl: false
        }}
        disabled
      />
      <h2>Notes</h2>
      <ul>{
        notes.map(note => <li>
          <p>[{format(parseISO(note.timestamp), "yyyy-MM-dd")}]</p>
          <p>{note.content}</p>
        </li>)
      }</ul>
      <AddNote machine_id={machine.id} />
    </div>
  )
}

export default MachineDetails
