import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ FORCE dotenv to load backend/.env
dotenv.config({ path: `${__dirname}/.env` });

import app from "./src/app.js";
import connectDB from "./src/db/db.js";

const PORT = 3000;


connectDB();

app.listen(PORT, () => {
  console.log("server is running on localhost 3000");
});
