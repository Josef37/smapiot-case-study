import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';

export const EventListItem = ({ event, first }) => {
  const { machine_id, machineName, timestamp, status } = event
  const timeDistance = formatDistanceToNow(parseISO(timestamp), { addSuffix: true })

  return (
    <ListItem>
      <ListItemText>
        <StyledLink to={`/machines/${machine_id}`}>
          <Title>{machineName}</Title>
        </StyledLink>
        <Status>{status}</Status>
        <Timestamp>{timeDistance}</Timestamp>
      </ListItemText>
    </ListItem>
  )
}

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit"
})

const Title = styled(props =>
  <Typography variant="h6" {...props} />
)(({ theme }) => ({
  fontWeight: "bold",
}))

const Status = styled(Typography)({})

const Timestamp = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
  fontSize: "0.7rem"
}))