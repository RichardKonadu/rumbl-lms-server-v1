import "dotenv/config";
import cors from "cors";
import express from "express";
import userRoutes from "./routes/users.js";
import teamRoutes from "./routes/teams.js";
import fixtureRoutes from "./routes/fixtures.js";
import predictionRoutes from "./routes/predictions.js";
import leagueRoutes from "./routes/leagues.js";
import leagueUserRoutes from "./routes/leagueuser.js";

const app = express();

app.use(cors({ origin: process.env.LOCAL_URL }));

app.use(express.json());

app.use("/users", userRoutes);
app.use("/teams", teamRoutes);
app.use("/fixtures", fixtureRoutes);
app.use("/predictions", predictionRoutes);
app.use("/leagues", leagueRoutes);
app.use("/leagueuser", leagueUserRoutes);

const PORT = process.env.PORT || 8082;
app.get("/", (req, res) => {
  res.send("working");
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
