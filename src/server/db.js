import PouchDB from "pouchdb";

const db = new PouchDB("my_database");


/**
 * Saving data to database asynchronously, send error when unsuccessful
 *
 * @param {string} key - id for the data
 * @param {string} data - Data to be saved
 * @returns {void}
 */
export async function saveData(key, data) {
  try {
    await db.put({
      _id: key,
      data: [data],
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
export async function getData(key) {
  try {
    const result = await db.get(key);
    console.log("DATA: ", result);
    console.log(`Data retrieved for key: ${key}`);
    return result.data;
  } catch (error) {
    console.error(`Error retrieving data for key ${key}:`, error);
    return null;
  }
}

export async function modifyData(data) {
  await db.put(data);
}

/**
 * Deleting data from database asynchronously, send error when unsuccessful
 *
 * @param {string} key - id for the data
 * @returns {void}
 */
export async function deleteData(key) {
  try {
    await db.remove(key);
    let data = await db.get(key);
    console.log(data);
    console.log(`Data deleted for key: ${key}`);
  } catch (error) {
    console.error(`Error deleting data for key ${key}:`, error);
  }
}

export async function loadData(name) {
  const data = await db.get(name);
  return data;
}

// export default PouchDBManager;
