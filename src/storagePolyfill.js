// Polyfill de window.storage compatible con la API usada por los módulos del app.
// Implementación real sobre localStorage del navegador — persiste en ESE dispositivo/navegador.
// Mismo contrato que el storage de artifacts: get(key, shared) / set(key, value, shared).
// El parámetro "shared" se ignora aquí porque no hay backend ni usuarios múltiples —
// toda la persistencia es local al dispositivo.

const PREFIX = 'cannabis-master-app:';

function isStorageAvailable() {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

const storageAvailable = isStorageAvailable();

window.storage = {
  async get(key) {
    if (!storageAvailable) return null;
    try {
      const raw = window.localStorage.getItem(PREFIX + key);
      if (raw === null) return null;
      return { key, value: raw, shared: false };
    } catch (e) {
      console.error('storage.get error', e);
      return null;
    }
  },

  async set(key, value) {
    if (!storageAvailable) return null;
    try {
      window.localStorage.setItem(PREFIX + key, value);
      return { key, value, shared: false };
    } catch (e) {
      // Cuota excedida u otro error — el banner de error del Diário ya maneja este caso
      console.error('storage.set error', e);
      return null;
    }
  },

  async delete(key) {
    if (!storageAvailable) return null;
    try {
      window.localStorage.removeItem(PREFIX + key);
      return { key, deleted: true, shared: false };
    } catch (e) {
      console.error('storage.delete error', e);
      return null;
    }
  },

  async list(prefix) {
    if (!storageAvailable) return null;
    try {
      const keys = [];
      const searchPrefix = PREFIX + (prefix || '');
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && k.startsWith(searchPrefix)) {
          keys.push(k.slice(PREFIX.length));
        }
      }
      return { keys, prefix, shared: false };
    } catch (e) {
      console.error('storage.list error', e);
      return null;
    }
  },
};

export default window.storage;
