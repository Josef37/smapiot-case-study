import React from 'react'

const MachineDetails = ({ id, status, machine_type, last_maintenance, install_date, floor }) => {
  return (
    <div>
      <div>id {id}</div>
      <div>status {status}</div>
      <div>machine_type {machine_type}</div>
      <div>last_maintenance {last_maintenance}</div>
      <div>install_date {install_date}</div>
      <div>floor {floor}</div>
    </div>
  )
}

export default MachineDetails
