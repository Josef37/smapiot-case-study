import { Socket } from "phoenix";

const subscribers = {}

/** @param { "ERROR" | "MESSAGE" } type */
export const subscribeTo = (type, callback) => {
  subscribers[type] = (subscribers[type] ?? []).concat(callback)
}
const callSubscribers = (type) => (...args) => {
  subscribers[type].forEach(subscriber => subscriber(...args))
}

const socket = new Socket("wss://machinestream.herokuapp.com/api/v1/events/websocket?vsn=2.0.0")
socket.connect()

const channel = socket.channel("events")
channel.join()
  .receive("error", callSubscribers("ERROR"))
  .receive("timeout", callSubscribers("ERROR"))
channel.onError(callSubscribers("ERROR"))
channel.on("new", callSubscribers("MESSAGE"))
