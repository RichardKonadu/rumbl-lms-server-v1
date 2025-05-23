import "dotenv/config";
import axios from "axios";

const BASE_URL = "https://api.balldontlie.io/epl/v1";

const fetchFixtures = async (gameweek) => {
  try {
    const teamsResponse = await axios.get(`${BASE_URL}/teams?season=2024`, {
      headers: {
        Authorization: `${process.env.API_KEY}`,
      },
    });
    const matchesResponse = await axios.get(
      `${BASE_URL}/games?season=2024&week=${gameweek}`,
      {
        headers: {
          Authorization: `${process.env.API_KEY}`,
        },
      }
    );
    const updatedMatches = matchesResponse.data.data.map((match) => {
      const foundHomeTeam = teamsResponse.data.data.find((team) => {
        return team.id === match.home_team_id;
      });

      const foundAwayTeam = teamsResponse.data.data.find((team) => {
        return team.id === match.away_team_id;
      });
      const updatedMatch = {
        ...match,
        home_team_name: foundHomeTeam.name,
        away_team_name: foundAwayTeam.name,
        home_team_abbr: foundHomeTeam.abbr,
        away_team_abbr: foundAwayTeam.abbr,
      };
      return updatedMatch;
    });
    return updatedMatches;
  } catch (error) {}
};

export { fetchFixtures };
