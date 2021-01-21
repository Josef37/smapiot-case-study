import React from 'react'
import MachinesMap from '../MachinesMap/MachinesMap'

const MachineDetails = ({ machine }) => {
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
    </div>
  )
}

export default MachineDetails
