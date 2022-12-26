import type { Player, Team } from ".";
export interface PlayerGameStat {
  id: number;
  ast: number;
  blk: number;
  dreb: number;
  fg3_pct: number;
  fg3a: number;
  fg3m: number;
  fg_pct: number;
  fga: number;
  fgm: number;
  ft_pct: number;
  fta: number;
  ftm: number;
  game: {
    id: number;
    date: string;
    home_team_id: number;
    home_team_score: number;
    season: number;
    visitor_team_id: number;
    visitor_team_score: number;
  };
  min: string;
  oreb: number;
  pf: number;
  player: Player;
  pts: number;
  reb: number;
  stl: number;
  team: Team;
  turnover: number;
}
