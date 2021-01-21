import { configureStore } from "@reduxjs/toolkit";
import { subscribeTo } from "../api/socket";
import machines, { socketError, addEvent } from "./slices/machines";

const store = configureStore({
    reducer: {
        machines
    }
})

subscribeTo("ERROR", () => store.dispatch(socketError()))
subscribeTo("MESSAGE", msg => store.dispatch(addEvent(msg)))

export default store
