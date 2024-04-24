import PouchDBManager from "pouchdb";

class Store {
  constructor(dbName) {
    this.pouchDB = new PouchDBManager(dbName);
  }

  // Save data to both PouchDB and local storage
  async saveData(key, data) {
    try {
      // Save to PouchDB
      await this.pouchDB.saveData(key, data);
      // Save to local storage
      localStorage.setItem(key, JSON.stringify(data));
      console.log(`Data saved for key: ${key}`);
    } catch (error) {
      console.error(`Error saving data for key ${key}:`, error);
    }
  }

  // Get data from both PouchDB and local storage
  async getData(key) {
    try {
      // Try to get from PouchDB first
      const pouchDBData = await this.pouchDB.getData(key);
      if (pouchDBData) {
        return pouchDBData;
      }
      // If not found in PouchDB, try local storage
      const localData = localStorage.getItem(key);
      if (localData) {
        return JSON.parse(localData);
      }
      // If not found in both PouchDB and local storage
      return null;
    } catch (error) {
      console.error(`Error retrieving data for key ${key}:`, error);
      return null;
    }
  }

  // Delete data from both PouchDB and local storage
  async deleteData(key) {
    try {
      // Delete from PouchDB
      await this.pouchDB.deleteData(key);
      // Delete from local storage
      localStorage.removeItem(key);
      console.log(`Data deleted for key: ${key}`);
    } catch (error) {
      console.error(`Error deleting data for key ${key}:`, error);
    }
  }
}

export default Store;
  
