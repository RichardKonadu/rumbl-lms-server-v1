import express from "express";
import "dotenv/config";
import connection from "../utils/connection.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const leagueData = req.body;
  const sql = `INSERT INTO leagues SET ?`;

  try {
    const [results] = await connection.query(sql, [leagueData]);
    res.status(201).json({ msg: "League successfully created" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
export default router;
