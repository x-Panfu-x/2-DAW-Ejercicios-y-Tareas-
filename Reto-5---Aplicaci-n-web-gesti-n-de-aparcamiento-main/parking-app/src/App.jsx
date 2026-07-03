import React, { useState, useEffect } from 'react';
import Mapparking from './Componentes/Mapparking'; // Nombre de archivo corregido
import { storageService } from './Servicios/storage'; // Nombre de carpeta corregido
import './App.css';

function App() {
  const [parking, setParking] = useState(storageService.getParking());
  const [tempPos, setTempPos] = useState(null);
  const [history, setHistory] = useState(storageService.getHistory());
  const [elapsedTime, setElapsedTime] = useState('');

  // HU-02: Tiempo transcurrido [cite: 11, 24]
  useEffect(() => {
    let interval;
    if (parking) {
      interval = setInterval(() => {
        const diff = Math.floor((new Date() - new Date(parking.timestamp)) / 1000);
        const m = Math.floor(diff / 60);
        const s = diff % 60;
        setElapsedTime(`${m}m ${s}s`);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [parking]);

  const handleSave = () => {
    if (tempPos) {
      const data = { ...tempPos, timestamp: new Date().toISOString() };
      storageService.saveParking(data);
      setParking(data);
      setTempPos(null);
    }
  };

  const handleFinish = () => {
    setHistory(storageService.saveToHistory(parking));
    storageService.clearParking();
    setParking(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🚗 BusacaTuCoche</h1>
      </header>

      <Mapparking parkingPos={parking || tempPos} setTempPos={!parking ? setTempPos : null} />

      <main className="app-content">
        {!parking ? (
          <div className="setup">
            <p>{tempPos ? "-Ubicacion seleccionada-" : "👆 Toca el mapa para marcar el coche"}</p>
            <button className="btn-action btn-park" onClick={handleSave} disabled={!tempPos}>
              CONFIRMAR APARCAMIENTO
            </button>
          </div>
        ) : (
          <div className="status">
            <div className="info-card">
              <p><strong>Tiempo:</strong> {elapsedTime}</p>
              <p className="timestamp">Desde: {new Date(parking.timestamp).toLocaleTimeString()}</p>
            </div>
            <button className="btn-action btn-finish" onClick={handleFinish}>LIBERAR PLAZA</button>
          </div>
        )}

        {history.length > 0 && (
          <section className="history">
            <h4>Historial (HU-05)</h4>
            <ul>
              {history.slice(0, 3).map((h, i) => (
                <li key={i}>{new Date(h.timestamp).toLocaleString()}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;