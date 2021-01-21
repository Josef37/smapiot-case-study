import React from 'react'
import List from '@material-ui/core/List'
import useIntervalUpdate from '../../hooks/useIntervalUpdate'
import { EventListItem } from './EventListItem'

const updateIntervalInMs = 30 * 1000

const EventsList = ({ events }) => {
  useIntervalUpdate(updateIntervalInMs)

  return events.length
    ? <List>{
      events.map((event, index) =>
        <EventListItem
          key={event.id}
          event={event}
          first={index === 0}
        />)
    }</List>
    : "No events to display"
}

export default EventsList
