import { Team } from "./Team";
import { Player } from "./Player";
import { PlayerSeasonAverage } from "./SeasonAverage";
import { PlayerGameStat } from "./PlayerGameStat";

interface SelectedPlayer extends Player {
  seasonAverages: PlayerSeasonAverage;
  allGameStatsForSeason: PlayerGameStat[];
  last10GameStats: PlayerGameStat[];
}
export {
  Player,
  PlayerGameStat,
  PlayerSeasonAverage,
  PlayerWithSeasonAverage,
  SelectedPlayer,
  Team,
};
