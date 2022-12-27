<script lang="ts">
	import StatsTableRow from "@components/StatsTableRow.svelte";
	import type { PlayerWithSeasonAverage } from "@local-types/ball-dont-lie";
	export let selectedPlayers: PlayerWithSeasonAverage[] = [];
	const tableHeaders = [
		"Player",
		"Games",
		"PTS",
		"REB",
		"AST",
		"STL",
		"BLK",
		"TO",
		"FG",
		"FGA",
		"FG%",
		"3P",
		"3PA",
		"3P%",
		"FT",
		"FTA",
		"FT%",
		"Fantasy Points",
	];
	const today = new Date();
	$: yearString = `${today.getFullYear()}-${today.getFullYear() + 1 - 2000}`;
</script>

<div class="">
	<div class="sm:flex flex-col sm:items-center">
		<h1 class="text-xl font-semibold text-gray-900">Season Average</h1>
		<p class="mt-2 text-sm text-gray-700">
			{yearString} Season
		</p>
	</div>
	<div class="mt-8 flex flex-col">
		<div>
			<div class="inline-block py-2 md:px-6 lg:px-8">
				<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
					<table class=" divide-y divide-gray-300">
						<thead class="bg-gray-100">
							<tr class="divide-x divide-gray-200">
								{#each tableHeaders as tableHeader (tableHeader)}
									<th
										scope="col"
										class="sticky top-0 z-10 whitespace-nowrap p-3.5 text-sm font-semibold text-gray-900"
										>{tableHeader}</th>
								{/each}
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 bg-white">
							{#each selectedPlayers as player (player.id)}
								<tr class="divide-x divide-gray-200">
									<td
										class="text-center whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900"
										>{player.first_name} {player.last_name}</td>
									<td class="text-center whitespace-nowrap px-2 py-2 text-sm text-gray-500"
										>{player.seasonStats.games_played}</td>
									<StatsTableRow stats={player.seasonStats} />
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
