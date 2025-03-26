import express from "express";
import "dotenv/config";
import axios from "axios";
import { fetchFixtures } from "../utils/helpers.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await fetchFixtures();
  console.log(data);
  res.json(data);
});

export default router;
