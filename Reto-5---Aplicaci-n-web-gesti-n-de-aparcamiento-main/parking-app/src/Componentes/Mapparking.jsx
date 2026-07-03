import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Componente para detectar el clic en el mapa (HU-01 personalizada)
function MapEvents({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng); // Captura latitud y longitud del clic
    },
  });
  return null;
}

const carIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2555/2555013.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38] // Para que la punta del icono coincida con el clic
});

export default function ParkingMap({ parkingPos, setTempPos }) {
  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <MapContainer center={[40.4167, -3.7033]} zoom={15} style={{ height: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* Detectar clic manual */}
        <MapEvents onMapClick={setTempPos} />

        {/* Marcador del coche guardado */}
        {parkingPos && (
          <Marker position={[parkingPos.lat, parkingPos.lng]} icon={carIcon} />
        )}
      </MapContainer>
    </div>
  );
}