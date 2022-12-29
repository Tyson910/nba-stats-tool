<script lang="ts">
	import type { SelectedPlayer } from "@local-types/ball-dont-lie";
	import SeasonAveragesTable from "@components/season-stats/SznStatsTable.svelte";
	import SeasonAveragesGraph from "@components/season-stats/SeasonAveragesBarChart.svelte";
	import StatsLineChart from "@components/StatsLineChart.svelte";

	type ValidTabOptions = "Season Averages" | "Last 10 Games Played" | "All Games From Season";

	export let selectedPlayers: SelectedPlayer[] = [];

	const options: ValidTabOptions[] = [
		"Season Averages",
		"Last 10 Games Played",
		"All Games From Season",
	];
	let selectedTab: ValidTabOptions = "Season Averages";
</script>

<div class="mb-10">
	<div class="border-b border-gray-200">
		<nav
			class="-mb-px flex justify-center"
			aria-label="Tabs">
			{#each options as option (option)}
				{@const isCurrentPage = selectedTab == option}
				<button
					type="button"
					disabled={selectedPlayers.length == 0}
					aria-current={isCurrentPage ? "page" : null}
					on:click={() => (selectedTab = option)}
					class={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm
							text-gray-500 hover:text-gray-700 hover:border-gray-300 
							aria-[current=page]:text-indigo-600 aria-[current=page]:border-current`}>
					{option}</button>
			{/each}
		</nav>
	</div>
</div>

{#if selectedTab == "Season Averages"}
	<SeasonAveragesTable {selectedPlayers} />
	<SeasonAveragesGraph {selectedPlayers} />
{:else if selectedTab == "Last 10 Games Played"}
	<StatsLineChart
		selectedTab={"last10GameStats"}
		{selectedPlayers} />
{:else if selectedTab == "All Games From Season"}
	<StatsLineChart
		selectedTab={"allGameStatsForSeason"}
		{selectedPlayers} />
{/if}
