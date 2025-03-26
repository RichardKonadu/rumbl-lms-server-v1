import express from "express";
import "dotenv/config";
import axios from "axios";

const BASE_URL = "https://api.balldontlie.io/epl/v1";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/teams?season=2024`, {
      headers: {
        Authorization: `${process.env.API_KEY}`,
      },
    });
    res.json(data.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("error fetching teams or matches");
  }
});

export default router;
