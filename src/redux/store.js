import { configureStore } from "@reduxjs/toolkit";
import { subscribeTo } from "../api/socket";
import machines, { socketError, addEvent } from "./slices/machines";

const store = configureStore({
    reducer: {
        machines
    }
})

subscribeTo("ERROR", () => store.dispatch(socketError()))
subscribeTo("MESSAGE", message => store.dispatch(addEvent(message)))

export default store
