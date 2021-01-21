import React from 'react'
import useIntervalUpdate from '../../hooks/useIntervalUpdate'
import { EventListItem } from './EventListItem'

const updateIntervalInMs = 30 * 1000

const EventsList = ({ events }) => {
  useIntervalUpdate(updateIntervalInMs)

  return events.length
    ? events.map(event => <EventListItem key={event.id} {...event} />)
    : "No events to display"
}

export default EventsList
