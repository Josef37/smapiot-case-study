import React from 'react'
import { parseISO, formatDistanceToNowStrict, differenceInDays } from 'date-fns'
import AddNote from '../AddNote'
import MachinesMap from '../MachinesMap/MachinesMap'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { styled } from '@material-ui/core/styles';
import capitalize from "lodash/capitalize";
import Status from '../Status'
import TimestampList from './TimestampList'

const MachineDetails = ({ machine, notes, events }) => {
  const { name, status, machine_type, last_maintenance, floor } = machine
  const uptime = formatDistanceToNowStrict(parseISO(last_maintenance))
  const numberOfErrors = events.filter(event => event.status === "errored").length
  const eventLimitInDays = 30
  const latestEvents = events.filter(event =>
    eventLimitInDays > differenceInDays(Date.now(), parseISO(event.timestamp)))

  return (
    <Container>
      <Typography variant="h3" style={{ fontWeight: "bold" }}>{name}</Typography>
      <Status status={status}></Status>
      <Typography>Type: {capitalize(machine_type)}</Typography>
      <Typography>Floor: {floor}</Typography>

      <Typography variant="h4" style={{ marginTop: 20 }}>
        Details
      </Typography>
      <Box main={uptime} aside="Uptime" />
      <Box main={numberOfErrors} aside="Errors" />

      <Typography variant="h4" style={{ marginTop: 20 }}>
        Notes
      </Typography>
      <TimestampList
        data={notes}
        getTimestamp={note => parseISO(note.timestamp)}
        getContent={note => note.content}
        emptyMsg="No notes stored..."
      />

      <Typography variant="h4" style={{ marginTop: 20 }}>
        Events <span style={{ fontSize: "0.6em" }}>from the last {eventLimitInDays} days</span>
      </Typography>
      <TimestampList
        data={latestEvents}
        getTimestamp={event => parseISO(event.timestamp)}
        getContent={event => event.status}
        emptyMsg="No events recorded..."
      />

      <Aside>
        <MachinesMap
          machines={[machine]}
          mapContainerProps={{
            style: { height: 250, width: 250 },
            boundsOptions: { maxZoom: 19 },
            zoomControl: false,
          }}
          disabled
        />
        <AddNote machine_id={machine.id} />
      </Aside>
    </Container>
  )
}

const Box = ({ main, aside }) => (
  <Paper style={{ display: "inline-block", padding: 16, margin: 10, minWidth: 100 }}>
    <Typography style={{ fontWeight: "bold", fontSize: 32 }}>{main}</Typography>
    <Typography>{aside}</Typography>
  </Paper>
)

const Container = styled("div")({
  padding: "30px 20px",
  position: "relative"
})

const Aside = styled("div")({
  position: "absolute",
  top: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
  gap: 20,
  alignItems: "center"
})

export default MachineDetails
