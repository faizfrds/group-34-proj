import PouchDBManager from "pouchdb"

class Store {
  /**
   * Creates an instance of Store.
   *
   * @param {string} dbName The name of the PouchDB database.
   */
  constructor(dbName) {
    this.pouchDB = new PouchDBManager(dbName);
  }

  /**
   * Saves data to both PouchDB and local storage.
   *
   * @param {string} key The key under which the data will be saved.
   * @param {any} data The data to be saved.
   * @returns {Promise<void>} A Promise that resolves when data is successfully saved.
   */
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

  //
  /**
   * Get data from both PouchDB and local storage
   *
   * @param {string} key The key under which the data is stored.
   * @returns {Promise<any>} A Promise that resolves with the retrieved data, or null if data is not found.
   */
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

  /**
   * Deletes data from both PouchDB and local storage.
   *
   * @param {string} key The key under which the data is stored.
   * @returns {Promise<void>} A Promise that resolves when data is successfully deleted.
   */
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
