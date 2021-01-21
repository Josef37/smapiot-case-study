import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <Link to="/machines">Machines</Link>
      <Link to="/events">Events</Link>
    </div>
  )
}

export default Header
