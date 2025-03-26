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
export default router;
