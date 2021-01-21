import { configureStore } from "@reduxjs/toolkit"
import { subscribeTo } from "../api/socket"
import machinesReducer, { socketError, addEvent } from "./slices/machines"
import notesReducer from "./slices/notes"

const store = configureStore({
    reducer: {
        machines: machinesReducer,
        notes: notesReducer
    }
})

subscribeTo("ERROR", () => store.dispatch(socketError()))
subscribeTo("MESSAGE", message => store.dispatch(addEvent(message)))

export default store
