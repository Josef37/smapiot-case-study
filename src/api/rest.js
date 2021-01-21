import axios from "axios"

const restInstance = axios.create({
  baseURL: "https://machinestream.herokuapp.com/api/v1/"
})

export const getMachines = async () => {
  const response = await restInstance.get("/machines")
  const machines = response.data?.data
  if (!machines) throw new Error("No machines received")
  return machines
}

export const getMachineDetails = async (id) => {
  const response = await restInstance.get(`/machines/${id}`)
  const machine = response.data?.data
  if (!machine) throw new Error("No machine details received")
  return machine
}
