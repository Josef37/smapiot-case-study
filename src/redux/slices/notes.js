import { createEntityAdapter, createSlice, createSelector } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from "uuid"
import memoize from 'lodash/memoize'

const notesAdapter = createEntityAdapter()

const initialState = notesAdapter.getInitialState()

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: {
      reducer: notesAdapter.addOne,
      prepare: note => ({ payload: { id: uuidv4(), ...note } })
    }
  }
})

export const {
  selectAll: selectAllNotes
} = notesAdapter.getSelectors(state => state.notes)

export const selectNotesByMachineId = createSelector(
  selectAllNotes,
  notes => memoize(
    machine_id => notes.filter(notes => notes.machine_id === machine_id)
  )
)
export const {
  addNote
} = notesSlice.actions
export default notesSlice.reducer
