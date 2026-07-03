const PARKING_KEY = 'parking_actual';
const HISTORY_KEY = 'parking_historial';

export const storageService = {
  // Guarda los datos del aparcamiento actual [cite: 34]
  saveParking: (data) => {
    localStorage.setItem(PARKING_KEY, JSON.stringify(data));
  },
  // Recupera el aparcamiento actual para mantener la sesión activa [cite: 34]
  getParking: () => {
    const data = localStorage.getItem(PARKING_KEY);
    return data ? JSON.parse(data) : null;
  },
  // Elimina el registro actual al finalizar la sesión [cite: 13]
  clearParking: () => {
    localStorage.removeItem(PARKING_KEY);
  },
  // Gestiona el historial de aparcamientos previos [cite: 35]
  saveToHistory: (parking) => {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    const newHistory = [parking, ...history];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    return newHistory;
  },
  getHistory: () => {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  }
};