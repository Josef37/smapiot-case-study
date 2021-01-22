import React from 'react'
import { NavLink } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import { getIconByType } from '../../utils/mapIcon'
import { styled } from '@material-ui/core/styles'
import Status from '../Status'

const MachineListItem = ({ id, name, status, machine_type }) => (
  <StyledNavLink
    to={`/machines/${id}`}
  >
    <ListItem>
      <ListItemText>
        <Typography variant="h4">{name}</Typography>
        <Status status={status} />
      </ListItemText>
      <ListItemIcon
        style={{ position: "relative", transform: "translateX(50%)" }}
        ref={node => {
          if (!node || node.firstChild)
            return
          node.appendChild(getIconByType(machine_type).createIcon())
        }} />
    </ListItem>
  </StyledNavLink>
)

const StyledNavLink = styled(NavLink)({
  borderRight: "4px solid",
  borderRightColor: "transparent",
  textDecoration: "none",
  display: "block",
  color: "inherit",
  "&.active": { borderRightColor: "green" }
})

export default MachineListItem
