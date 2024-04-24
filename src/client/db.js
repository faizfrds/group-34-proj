class PouchDBManager {
    constructor(dbName) {
      this.db = new PouchDB(dbName);
    }
  
    async saveData(key, data) {
      try {
        await this.db.put({
          _id: key,
          data: data
        });
        console.log(`Data saved for key: ${key}`);
      } catch (error) {
        console.error(`Error saving data for key ${key}:`, error);
      }
    }
  
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
