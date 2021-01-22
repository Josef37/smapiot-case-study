import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import { getMachineDetails, getMachines } from '../../api/rest';
import memoize from "lodash/memoize";
import { parseISO, compareDesc } from "date-fns";

const machinesAdapter = createEntityAdapter({
  sortComparer: (machine1, machine2) => machine1?.name?.localeCompare(machine2?.name)
})
const getEventId = (event) => `${event.timestamp},${event.machine_id},${event.status}`
const eventsAdatper = createEntityAdapter({
  selectId: getEventId,
  sortComparer: (event1, event2) => compareDesc(parseISO(event1.timestamp), parseISO(event2.timestamp))
})

const initialState = {
  machines: machinesAdapter.getInitialState(),
  events: machinesAdapter.getInitialState(),
  isLoading: false,
  errors: []
}

const addNamesToMachines = (machines) => machines.map((machine, index) => ({
  name: `Machine ${(machines.length - index).toString().padStart(Math.log10(machines.length) + 1, "0")}`,
  ...machine
}))
export const loadMachines = createAsyncThunk("machines/load", async (arg, { getState }) => {
  const machines = await getMachines()
  return addNamesToMachines(machines)
})
export const loadMachineDetails = createAsyncThunk("machines/details", async (id) => {
  const machineDetails = await getMachineDetails(id)
  machineDetails.events = machineDetails.events.map(event => ({
    machine_id: machineDetails.id,
    ...event
  }))
  return machineDetails
})

const machinesSlice = createSlice({
  name: "machines",
  initialState,
  reducers: {
    socketError: (state) => {
      state.errors.push("Websocket error")
    },
    addEvent: (state, { payload: event }) => {
      eventsAdatper.addOne(state.events, event)
      machinesAdapter.updateOne(state.machines, {
        id: event.machine_id,
        changes: { status: event.status }
      })
    }
  },
  extraReducers: {
    [loadMachines.pending]: (state, action) => {
      state.isLoading = true
    },
    [loadMachines.fulfilled]: (state, { payload: machines }) => {
      state.isLoading = false
      machinesAdapter.upsertMany(state.machines, machines)
    },
    [loadMachines.rejected]: (state, { error }) => {
      state.isLoading = false
      state.errors.push(error.message)
    },
    [loadMachineDetails.fulfilled]: (state, { payload: machineDetails }) => {
      eventsAdatper.upsertMany(state.events, machineDetails.events)
      delete machineDetails.events
      machinesAdapter.upsertOne(state.machines, machineDetails)
    }
  }
})

export const {
  selectAll: selectAllEvents
} = eventsAdatper.getSelectors(state => state.machines.events)
export const {
  selectAll: selectAllMachines,
  selectById: selectMachineById
} = machinesAdapter.getSelectors(state => state.machines.machines)
export const selectEventsByMachineId = createSelector(
  selectAllEvents,
  events => memoize(
    machine_id => events.filter(event => event.machine_id === machine_id)
  )
)

export const {
  socketError,
  addEvent
} = machinesSlice.actions
export default machinesSlice.reducer
