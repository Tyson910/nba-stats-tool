import type {
  Player,
  PlayerSeasonAverage,
  PlayerGameStat
} from "@local-types/ball-dont-lie/index";

interface APIResponse<Type> {
  data: Type[];
  meta: {
    total_pages: number;
    current_page: number;
    next_page: number | null;
    per_page: number;
    total_count: number;
  };
}

/** Fetches player info based on name */
export async function searchPlayerName(name: string): Promise<Player[]> {
  if (!name) return [];
  const API = "https://www.balldontlie.io/api/v1/players?search=";
  // Replace spaces with underscores
  const query = name.trim().split(" ").join("_");
  try {
    const response = await fetch(API + query + "&per_page=5");
    const { data }: APIResponse<Player> = await response.json();
    const onlyCurrentPlayers = data.filter((player) => !!player.position);
    return onlyCurrentPlayers;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getPlayerSeasonAverages(
  playerID: Player["id"],
): Promise<PlayerSeasonAverage | null> {
  const API = "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=";
  try {
    const response = await fetch(API + playerID);
    const { data }: APIResponse<PlayerSeasonAverage> = await response.json();
    return data[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getAllGameStatsForSeason(
  playerID: Player["id"],
): Promise<PlayerGameStat[]> {
  const API =
    `https://www.balldontlie.io/api/v1/stats?seasons[]=2022&per_page=82&player_ids[]=`;
  try {
    const response = await fetch(API + playerID);
    const { data }: APIResponse<PlayerGameStat> = await response.json();

    // sorting with latest date
    return [...data].sort((a, b) =>
      Date.parse(a.game.date) - Date.parse(b.game.date)
    );
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function fetchStatsInADateRange(
  playerID: Player["id"],
  startDate: Date,
  endDate: Date,
): Promise<PlayerGameStat[]> {
  const API = `https://www.balldontlie.io/api/v1/stats/?start_date=${
    createAPIDate(startDate)
  }&end_date=${createAPIDate(endDate)}&player_ids[]=`;
  try {
    const response = await fetch(API + playerID);
    const { data }: APIResponse<PlayerGameStat> = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

/**
 * returns date in 'YYYY-MM-DD' numerical format for API reference
 */
function createAPIDate(uglyDate: Date): string {
  // API saves Jan == 1, Feb ==2 so we add 1 to the get Month function
  return uglyDate.getFullYear() + "-" + (uglyDate.getMonth() + 1) + "-" +
    uglyDate.getDate();
}
