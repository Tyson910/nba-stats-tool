<script lang="ts">
  import { getESPNFantasyScore } from "../../utils/fantasy-score-helpers";
  export let firstName = "";
  export let lastName = "";
  export let playerStats = null;
  let {
    ast,
    blk,
    fgm,
    fga,
    fg_pct,
    ftm,
    fta,
    ft_pct,
    fg3a,
    fg3m,
    fg3_pct,
    pts,
    reb,
    stl,
    games_played,
    turnover,
  } = playerStats;
</script>

<tr>
  <th>{firstName} {lastName}</th>
  <td>{games_played}</td>
  <td>{pts.toFixed(1)}</td>
  <td>{reb.toFixed(1)}</td>
  <td>{ast.toFixed(1)}</td>
  <td>{stl.toFixed(1)}</td>
  <td>{blk.toFixed(1)}</td>
  <td>{turnover.toFixed(1)}</td>
  <td>{fgm.toFixed(1)}</td>
  <td>{fga.toFixed(1)}</td>
  <td>{(fg_pct * 100).toFixed(1)} </td>
  <td>{fg3m.toFixed(1)}</td>
  <td>{fg3a.toFixed(1)}</td>
  <td>{(fg3_pct * 100).toFixed(1)}</td>
  <td>{ftm.toFixed(1)}</td>
  <td>{fta.toFixed(1)}</td>
  <td>{(ft_pct * 100).toFixed(1)}</td>
  <td>{getESPNFantasyScore(playerStats)}</td>
</tr>
