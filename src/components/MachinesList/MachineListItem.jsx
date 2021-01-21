import React from 'react'
import { NavLink } from 'react-router-dom'

const MachineListItem = ({ id, name, status, machine_type }) => (
  <NavLink to={`/machines/${id}`} style={{ display: "inline-block" }} activeStyle={{ backgroundColor: "#0804" }}>
    <div>Name: {name}</div>
    <div>Status: {status}</div>
    <div>Type: {machine_type}</div>
  </NavLink>
)

export default MachineListItem
