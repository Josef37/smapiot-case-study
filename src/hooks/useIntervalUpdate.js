import { useEffect, useReducer } from "react"

const useIntervalUpdate = (ms) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  useEffect(() => {
    const handle = setTimeout(forceUpdate, ms)
    return () => clearTimeout(handle)
  })
}

export default useIntervalUpdate