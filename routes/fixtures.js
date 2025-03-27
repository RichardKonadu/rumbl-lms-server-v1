import express from "express";
import "dotenv/config";
import { fetchFixtures } from "../utils/helper.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const gameweek = req.query.gameweek;
  console.log(gameweek);

  try {
    const data = await fetchFixtures(gameweek);
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).send("error fetching fixtures");
  }
});

export default router;
