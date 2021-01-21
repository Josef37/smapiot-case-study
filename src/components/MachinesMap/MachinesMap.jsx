import React from 'react'
import { useHistory } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import { getIconByType } from '../../utils/mapIcon'
import 'leaflet/dist/leaflet.css';

const MachinesMap = ({ machines }) => {
  const outerBounds = machines.map(machine => ([
    machine.longitude,
    machine.latitude
  ]))
  const history = useHistory()

  return (
    <MapContainer
      bounds={outerBounds}
      boundsOptions={{ padding: [100, 100] }}
      zoomSnap={0.25}
      style={{ height: "90vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={22}
        maxNativeZoom={18}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        machines.map(machine => (
          <Marker
            icon={getIconByType(machine.machine_type)}
            key={machine.id}
            position={[machine.longitude, machine.latitude]}
            eventHandlers={{
              click: () => history.push(`/machines/${machine.id}`)
            }}
          >
            <Tooltip>
              {machine.id}
            </Tooltip>
          </Marker>
        ))
      }
    </MapContainer>
  )
}

export default MachinesMap
