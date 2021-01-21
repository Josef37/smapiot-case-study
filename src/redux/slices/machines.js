import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from "uuid";
import { getMachineDetails, getMachines } from '../../api/rest';
import memoize from "lodash/memoize";
import { parseISO, compareAsc, compareDesc } from "date-fns";

const machinesAdapter = createEntityAdapter({
  sortComparer: (machine1, machine2) => compareAsc(parseISO(machine1.install_date), parseISO(machine2.install_date))
})
const eventsAdatper = createEntityAdapter({
  sortComparer: (event1, event2) => compareDesc(parseISO(event1.timestamp), parseISO(event2.timestamp))
})

const initialState = {
  machines: machinesAdapter.getInitialState(),
  events: machinesAdapter.getInitialState(),
  isLoading: false,
  errors: []
}

export const loadMachines = createAsyncThunk("machines/load", () => getMachines())
export const loadMachineDetails = createAsyncThunk("machines/details", async (id) => {
  const machineDetails = await getMachineDetails(id)
  machineDetails.events = machineDetails.events.map(event => ({
    id: uuidv4(),
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
    },
  },
  extraReducers: {
    [loadMachines.pending]: (state, action) => {
      state.isLoading = true
    },
    [loadMachines.fulfilled]: (state, { payload: machines }) => {
      state.isLoading = false
      machinesAdapter.addMany(state.machines, machines)
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
