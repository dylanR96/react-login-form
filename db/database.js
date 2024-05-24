import DataStore from "nedb";

const database = new DataStore({ filename: "users.db", autoload: true });

export default database;
