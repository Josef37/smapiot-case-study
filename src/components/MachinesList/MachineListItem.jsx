import React from 'react'
import { Link } from 'react-router-dom'

const MachineListItem = ({ id, status, machine_type }) => (
  <Link to={`/machines/${id}`}>
    <div>Status: {status}</div>
    <div>Type: {machine_type}</div>
  </Link>
)

export default MachineListItem
