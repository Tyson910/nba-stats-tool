import { Team } from "./Team";
import { Player } from "./Player";
import { PlayerSeasonAverage } from "./SeasonAverage";
import { PlayerGameStat } from "./PlayerGameStat";
interface PlayerWithSeasonAverage extends Player {
  seasonStats: PlayerSeasonAverage;
}
export {
  Player,
  PlayerGameStat,
  PlayerSeasonAverage,
  PlayerWithSeasonAverage,
  Team,
};
