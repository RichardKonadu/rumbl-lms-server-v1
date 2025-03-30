import express from "express";
import "dotenv/config";
import connection from "../utils/connection.js";
import authorise from "../middleware/auth.js";

const router = express.Router();

router.post("/", authorise, async (req, res) => {
  const predictionData = req.body;
  const sql = `INSERT INTO predictions
                SET game_week = ?, team_id = ?, user_id = ?, league_id = ?`;

  try {
    const [results] = await connection.query(sql, [
      predictionData.game_week,
      predictionData.team_id,
      req.token.id,
      predictionData.league_id,
    ]);
    res.status(201).json({ msg: "Prediction successfully submitted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  const sql = `SELECT * FROM predictions`;

  try {
    const [results] = await connection.query(sql);
    if (!results.length) {
      res.status(404).json({ msg: "No predictions in database" });
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:leagueid", authorise, async (req, res) => {
  const leagueId = req.params.leagueid;

  const sql = `SELECT 
                p.did_win,
                p.game_week,
                p.league_id,
                p.team_id,
                p.user_id,
                u.name
                FROM 
                predictions p
                JOIN users u ON p.user_id = u.id
                WHERE p.user_id = ? AND league_id = ?
                `;
  try {
    const [results] = await connection.query(sql, [req.token.id, leagueId]);
    if (!results.length) {
      res.status(404).json({ msg: "No predictions found in database" });
      return;
    }
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
