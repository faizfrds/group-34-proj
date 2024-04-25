class PouchDBManager {
  /**
   * Creates an instance of PouchDB.
   *
   * @param {string} dbName The name of the PouchDB database.
   */
  constructor(dbName) {
    this.db = new PouchDB(dbName);
  }

  /**
   * Saving data to database asynchronously, send error when unsuccessful
   *
   * @param {string} key - id for the data
   * @param {string} data - Data to be saved
   * @returns {void}
   */
  async saveData(key, data) {
    try {
      await this.db.put({
        _id: key,
        data: data,
      });
      console.log(`Data saved for key: ${key}`);
    } catch (error) {
      console.error(`Error saving data for key ${key}:`, error);
    }
  }

  /**
   * Fetching data from database asynchronously, send error when unsuccessful
   *
   * @param {string} key - id for the data
   * @returns {void}
   */
  async getData(key) {
    try {
      const result = await this.db.get(key);
      console.log(`Data retrieved for key: ${key}`);
      return result.data;
    } catch (error) {
      console.error(`Error retrieving data for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Deleting data from database asynchronously, send error when unsuccessful
   *
   * @param {string} key - id for the data
   * @returns {void}
   */
  async deleteData(key) {
    try {
      await this.db.remove(key);
      console.log(`Data deleted for key: ${key}`);
    } catch (error) {
      console.error(`Error deleting data for key ${key}:`, error);
    }
  }
}

export default PouchDBManager;
