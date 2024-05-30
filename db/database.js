import DataStore from "nedb";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const database_directory = `${__dirname}\\users.db`;

const database = new DataStore({
  filename: database_directory,
  autoload: true,
});

export default database;
