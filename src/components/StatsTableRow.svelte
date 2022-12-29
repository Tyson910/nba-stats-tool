<script lang="ts">
	import type { PlayerSeasonAverage, PlayerGameStat } from "@local-types/ball-dont-lie";
	import { getESPNFantasyScore } from "@utils/fantasy-score-helpers";
	export let stats: PlayerSeasonAverage | PlayerGameStat;
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
		turnover,
	} = stats;
	$: fantasyScore = getESPNFantasyScore(stats);
</script>

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
<td>{fantasyScore}</td>

<style>
	td {
		@apply text-center whitespace-nowrap px-2 py-2 text-sm text-gray-500;
	}
</style>
