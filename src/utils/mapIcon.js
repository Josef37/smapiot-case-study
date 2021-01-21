import L from 'leaflet'
import rulerUrl from "./ruler.svg"
import microscopeUrl from "./microscope.svg"
import mapMarkerUrl from "./map-marker.svg"

const defaultIconOption = {
  iconSize: [32, 32],
  tooltipAnchor: [16, 0]
}
const createIcon = (options) => L.icon({
  ...defaultIconOption,
  ...options
})

const rulerIcon = createIcon({ iconUrl: rulerUrl })
const microscopeIcon = createIcon({ iconUrl: microscopeUrl })
const defaultIcon = createIcon({ iconUrl: mapMarkerUrl })

const typeIconMap = {
  "microscope": microscopeIcon,
  "measurement": rulerIcon,
}

export const getIconByType = (type) =>
  typeIconMap[type] ?? defaultIcon
