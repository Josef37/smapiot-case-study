import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { subscribeTo } from "../api/socket"
import machinesReducer, { socketError, addEvent } from "./slices/machines"
import notesReducer from "./slices/notes"

const rootReducer = combineReducers({
    machines: machinesReducer,
    notes: notesReducer,
})

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["notes"]
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})
export const persistor = persistStore(store)

subscribeTo("ERROR", () => store.dispatch(socketError()))
subscribeTo("MESSAGE", message => store.dispatch(addEvent(message)))
