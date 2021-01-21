import React from 'react'
import { useHistory } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import { getIconByType } from '../../utils/mapIcon'
import 'leaflet/dist/leaflet.css';

const MachinesMap = ({ machines, mapContainerProps = {}, disabled }) => {
  const outerBounds = machines.map(machine => ([
    machine.longitude,
    machine.latitude
  ]))
  const history = useHistory()

  return (
    <MapContainer
      bounds={outerBounds}
      zoomSnap={0.25}
      {...(disabled && disabledMapProps)}
      {...mapContainerProps}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={22}
        maxNativeZoom={19}
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
            interactive={!disabled}
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

const disabledMapProps = {
  dragging: false,
  touchZoom: false,
  doubleClickZoom: false,
  scrollWheelZoom: false,
  boxZoom: false,
  keyboard: false,
  tap: false,
}

export default MachinesMap
