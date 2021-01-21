import { createEntityAdapter, createSlice, createSelector } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from "uuid"
import memoize from 'lodash/memoize'
import { parseISO, compareDesc } from "date-fns";

const notesAdapter = createEntityAdapter({
  sortComparer: (note1, note2) => compareDesc(parseISO(note1.timestamp), parseISO(note2.timestamp))
})

const initialState = notesAdapter.getInitialState()

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: {
      reducer: notesAdapter.addOne,
      prepare: note => ({
        payload: {
          id: uuidv4(),
          timestamp: new Date().toISOString(),
          ...note
        }
      })
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
