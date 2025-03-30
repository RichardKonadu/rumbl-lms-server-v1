import express from "express";
import "dotenv/config";
import connection from "../utils/connection.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const userId = 1;
  const sql = `SELECT 
               league_user.user_id,
               league_user.league_id,
               leagues.name
               FROM league_user
               JOIN leagues on league_user.league_id = leagues.id
               WHERE user_id = ?`;

  try {
    const [results] = await connection.query(sql, [userId]);
    if (!results.length) {
      res.status(404).json({ msg: "No league members found" });
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
