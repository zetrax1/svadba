import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const CHURCH = { lat: 48.2396027, lon: 18.3031150, label: 'I',  name: 'Kostol Preblahoslavenej Panny Márie', desc: 'Svadobný obrad · 15:00' }
const WINERY = { lat: 48.2550279, lon: 18.3587829, label: 'II', name: 'Tajna Vineyards & Winery',             desc: 'Svadobná hostina · 18:00' }

function pinIcon(label, bg) {
  return L.divIcon({
    className: '',
    html: `<div style="
      background:${bg};color:#fff;
      width:34px;height:34px;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      display:flex;align-items:center;justify-content:center;
      border:2px solid #fff;
      box-shadow:0 2px 10px rgba(0,0,0,0.28)">
        <span style="transform:rotate(45deg);font-size:11px;font-weight:700;font-family:sans-serif;line-height:1">${label}</span>
      </div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -38],
  })
}

export default function VenueMap() {
  const mapRef     = useRef(null)
  const instanceRef = useRef(null)

  useEffect(() => {
    if (instanceRef.current) return

    const map = L.map(mapRef.current, {
      center: [48.247, 18.331],
      zoom: 12,
      scrollWheelZoom: false,
      zoomControl: true,
    })
    instanceRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    // Markers
    L.marker([CHURCH.lat, CHURCH.lon], { icon: pinIcon(CHURCH.label, '#4A7A92') })
      .addTo(map)
      .bindPopup(`<strong style="font-family:serif;font-size:14px">${CHURCH.name}</strong><br/><span style="font-size:12px;color:#6A7E82">${CHURCH.desc}</span>`)

    L.marker([WINERY.lat, WINERY.lon], { icon: pinIcon(WINERY.label, '#5A7D64') })
      .addTo(map)
      .bindPopup(`<strong style="font-family:serif;font-size:14px">${WINERY.name}</strong><br/><span style="font-size:12px;color:#6A7E82">${WINERY.desc}</span>`)

    // Driving route via public OSRM
    const osrm = `https://router.project-osrm.org/route/v1/driving/${CHURCH.lon},${CHURCH.lat};${WINERY.lon},${WINERY.lat}?overview=full&geometries=geojson`
    fetch(osrm)
      .then(r => r.json())
      .then(data => {
        const coords = data.routes[0].geometry.coordinates.map(([lon, lat]) => [lat, lon])
        L.polyline(coords, { color: '#C8A45A', weight: 4, opacity: 0.75, dashArray: '8 5' }).addTo(map)
      })
      .catch(() => {
        // Fallback straight line if OSRM is unavailable
        L.polyline([[CHURCH.lat, CHURCH.lon], [WINERY.lat, WINERY.lon]], {
          color: '#C8A45A', weight: 3, opacity: 0.55, dashArray: '8 5',
        }).addTo(map)
      })

    return () => { map.remove(); instanceRef.current = null }
  }, [])

  return <div ref={mapRef} className="venue__combined-map" />
}
