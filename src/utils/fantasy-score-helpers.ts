export function getESPNFantasyScore(
  {
    ast,
    blk,
    fgm,
    fga,
    ftm,
    fta,
    pts,
    reb,
    stl,
    turnover,
  }: {
    ast: number;
    blk: number;
    fgm: number;
    fga: number;
    ftm: number;
    fta: number;
    pts: number;
    reb: number;
    stl: number;
    turnover: number;
  },
): string {
  const total = (fgm - fga) + (ftm - fta) + (ast - turnover) +
    (reb + stl + blk + pts);
  return total.toFixed(2);
}
