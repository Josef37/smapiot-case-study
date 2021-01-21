import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { selectAllMachines } from "../../redux/slices/machines";

const MachinesMap = React.lazy(() => import('./MachinesMap'))

const MachinesMapContainer = () => {
  const machines = useSelector(selectAllMachines)

  if (!machines?.length)
    return "Nothing to show"

  return (
    <Suspense fallback="Loading map">
      <MachinesMap machines={machines} />
    </Suspense>
  )
}

export default MachinesMapContainer
