import express from "express";
import "dotenv/config";
import { fetchFixtures } from "../utils/helper.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await fetchFixtures();
  console.log(data);
  res.json(data);
});

export default router;
