import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';

export const EventListItem = ({ event }) => {
  const { machine_id, machineName, timestamp, status } = event
  const timeDistance = formatDistanceToNow(parseISO(timestamp), { addSuffix: true })

  return (
    <StyledListItem>
      <ListItemText>
        <StyledLink to={`/machines/${machine_id}`}>
          <Title variant="h4">{machineName}</Title>
        </StyledLink>
        <Status>{status}</Status>
        <Timestamp>{timeDistance}</Timestamp>
      </ListItemText>
    </StyledListItem>
  )
}

const StyledListItem = styled(ListItem)({
  "--base-size": "1rem",
  "&:first-child": {
    "--base-size": "2rem",
  },
})

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit"
})

const Title = styled(Typography)({
  fontWeight: "bold",
  fontSize: "calc(2 * var(--base-size))"
})

const Status = styled(Typography)({
  fontSize: "calc(1.2 * var(--base-size))"
})

const Timestamp = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
  fontSize: "calc(0.8 * var(--base-size))"
}))