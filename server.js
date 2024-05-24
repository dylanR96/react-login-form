import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import users from "./routes/users.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";

const port = process.env.PORT;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", users);

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
