import { useState, useEffect } from 'react';

export function useLocation() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    // Verificamos si el navegador soporta geolocalización
    if (!navigator.geolocation) {
      console.error("Geolocalización no soportada");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      (err) => console.error("Error obteniendo posición:", err),
      { 
        enableHighAccuracy: true, // Mayor precisión para el coche
        timeout: 5000,
        maximumAge: 0 
      }
    );

    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return position;
}