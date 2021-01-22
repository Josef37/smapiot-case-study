import React from 'react'
import { Link } from 'react-router-dom'
import { styled } from '@material-ui/core/styles'

const Header = () => {
  return (
    <Container>
      <StyledLink to="/machines">Machines</StyledLink>
      <StyledLink to="/events">Events</StyledLink>
    </Container>
  )
}

const Container = styled("nav")({
  display: "flex",
  gap: 20,
  alignItems: "center",
  paddingLeft: 20,
  borderBottom: "2px solid"
})

const StyledLink = styled(Link)({
  textDecoration: "none",
  fontSize: "1.6em"
})

export default Header
