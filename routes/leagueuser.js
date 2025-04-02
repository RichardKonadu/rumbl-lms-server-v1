import express from "express";
import "dotenv/config";
import connection from "../utils/connection.js";
import authorise from "../middleware/auth.js";
const router = express.Router();

router.get("/", authorise, async (req, res) => {
  const sql = `SELECT 
               league_user.user_id,
               league_user.league_id,
               leagues.name
               FROM league_user
               JOIN leagues on league_user.league_id = leagues.id
               WHERE user_id = ?`;

  try {
    const [results] = await connection.query(sql, [req.token.id]);
    if (!results.length) {
      res.status(404).json({ msg: "No league members found" });
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/users", authorise, async (req, res) => {
  const leagueId = req.query.leagueId;
  const sql = `SELECT DISTINCT user_id,
               users.name
               FROM league_user
               JOIN users ON league_user.user_id = users.id
               WHERE league_id = ?`;

  try {
    const [results] = await connection.query(sql, [leagueId]);
    if (!results.length) {
      res.status(404).json({ msg: "No users for provided league" });
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
