import React from 'react'
import { useHistory } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet'
import Typography from '@material-ui/core/Typography';
import { getIconByType } from '../../utils/mapIcon'
import 'leaflet/dist/leaflet.css';

const MachinesMap = ({ machines, mapContainerProps = {}, disabled }) => {
  const mapBounds = machines.map(machine => ([
    machine.longitude,
    machine.latitude
  ]))
  const history = useHistory()

  return (
    <MapContainer
      zoomSnap={0.25}
      bounds={mapBounds}
      {...(disabled && disabledMapProps)}
      {...mapContainerProps}
    >
      {machines.length === 1
        && <ChangeView center={mapBounds[0]} zoom={18} />}
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
              <Typography style={{ fontSize: "1.4rem" }}>{machine.name}</Typography>
            </Tooltip>
          </Marker>
        ))
      }
    </MapContainer>
  )
}

const ChangeView = ({ center, zoom }) => {
  const map = useMap()
  map.setView(center, zoom ?? map.getZoom())
  return null
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
