import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllEvents, selectMachineById } from '../../redux/slices/machines'
import EventsList from './EventsList'

const numberOfEvents = 4

const EventsListContainer = () => {
  const events = useSelector(selectAllEvents)
    .slice(0, numberOfEvents)

  const modifiedEvents = useSelector(state => events.map(event => ({
    machineName: selectMachineById(state, event.machine_id).name,
    ...event
  })))

  return <EventsList events={modifiedEvents} />
}

export default EventsListContainer
