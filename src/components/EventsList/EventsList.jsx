import React from 'react'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography';
import useIntervalUpdate from '../../hooks/useIntervalUpdate'
import { EventListItem } from './EventListItem'

const updateIntervalInMs = 30 * 1000

const EventsList = ({ events }) => {
  useIntervalUpdate(updateIntervalInMs)

  return events.length
    ? <List>{
      events.map((event, index) =>
        <EventListItem
          key={event.id || index}
          event={event}
        />)
    }</List>
    : <Typography>No events to display</Typography>
}

export default EventsList
