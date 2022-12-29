import type { Team } from ".";
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
    period: number;
    postseason: boolean;
    status: string;
    time: string;
    season: number;
    visitor_team_id: number;
    visitor_team_score: number;
  };
  min: string;
  oreb: number;
  pf: number;
  player: {
    id: number;
    first_name: string;
    height_feet: number;
    height_inches: number;
    last_name: string;
    position: "G" | "G-F" | "F" | "F-C" | "C";
    team_id: number;
    weight_pounds: number;
  };
  pts: number;
  reb: number;
  stl: number;
  team: Team;
  turnover: number;
}
