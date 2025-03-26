import "dotenv/config";
import cors from "cors";
import express from "express";
import userRoutes from "./routes/users.js";
import teamRoutes from "./routes/teams.js";
import fixtureRoutes from "./routes/fixtures.js";
import predictionRoutes from "./routes/predictions.js";
import leagueRoutes from "./routes/leagues.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use("/users", userRoutes);
app.use("/teams", teamRoutes);
app.use("/fixtures", fixtureRoutes);
app.use("/predictions", predictionRoutes);
app.use("/leagues", leagueRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
