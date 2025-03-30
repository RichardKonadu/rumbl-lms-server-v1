import express from "express";
import "dotenv/config";
import connection from "../utils/connection.js";
import authorise from "../middleware/auth.js";

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
router.post("/join/:id", authorise, async (req, res) => {
  const leagueId = req.params.id;
  const sql = `INSERT INTO
	league_user SET user_id = ?, league_id = ?`;

  try {
    const [results] = await connection.query(sql, [req.token.id, leagueId]);
    res.status(201).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  const sql = `SELECT * FROM leagues`;
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
