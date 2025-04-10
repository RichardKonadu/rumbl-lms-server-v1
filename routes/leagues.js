import express from "express";
import "dotenv/config";
import connection from "../utils/connection.js";
import authorise from "../middleware/auth.js";

const router = express.Router();

router.post("/", authorise, async (req, res) => {
  const leagueData = req.body;
  const sql = `INSERT INTO leagues SET ?`;
  const sqlAddUserToLeague = `INSERT INTO league_user SET ?`;

  try {
    const [results] = await connection.query(sql, [leagueData]);
    await connection.query(sqlAddUserToLeague, [
      { league_id: results.insertId, user_id: req.token.id },
    ]);
    res
      .status(201)
      .json({ msg: "League created and user added to new league" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/join/:id", authorise, async (req, res) => {
  const leagueId = req.params.id;
  const sql = `INSERT INTO
	league_user SET user_id = ?, league_id = ?`;

  try {
    const [results] = await connection.query(sql, [req.token.id, leagueId]);
    res.status(201).json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  const sql = `SELECT * FROM leagues
               WHERE in_progress = 0`;
  try {
    const [results] = await connection.query(sql);
    if (!results.length) {
      res.status(404).json({ msg: "No leagues in database" });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
