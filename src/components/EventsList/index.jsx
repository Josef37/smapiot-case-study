import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllEvents } from '../../redux/slices/machines'
import EventsList from './EventsList'

const numberOfEvents = 4

const EventsListContainer = () => {
  const events = useSelector(selectAllEvents).slice(0, numberOfEvents)

  return <EventsList events={events} />
}

export default EventsListContainer
