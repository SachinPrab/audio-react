const DB_NAME = 'audioFilesDB';
const STORE_NAME = 'audioFilesStore';

// Open IndexedDB database
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = (event) => {
      reject('Error opening IndexedDB database');
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    };
  });
};

// Add audio file to IndexedDB
const addAudioFile = (audioFile) => {
  return new Promise((resolve, reject) => {
    openDB().then((db) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(audioFile);
      
      request.onsuccess = (event) => {
        resolve();
      };

      request.onerror = (event) => {
        reject('Error adding audio file to IndexedDB');
      };
    }).catch((error) => {
      reject(error);
    });
  });
};

// Get all audio files from IndexedDB
const getAllAudioFiles = () => {
  return new Promise((resolve, reject) => {
    openDB().then((db) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject('Error getting audio files from IndexedDB');
      };
    }).catch((error) => {
      reject(error);
    });
  });
};

export { addAudioFile, getAllAudioFiles };
