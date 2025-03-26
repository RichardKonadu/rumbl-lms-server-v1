import connection from "../utils/connection.js";
import fs from "fs";

try {
  const sql = fs.readFileSync("./scripts/rumbl.sql").toString();
  await connection.query(sql);
  console.log("Database imported");
} catch (error) {
  console.error(`Database import failed: ${error}`);
}

process.exit();
