<script lang="ts">
	import type { SelectedPlayer } from "@local-types/ball-dont-lie";
	import type { ChartConfiguration } from "chart.js";
	import { onMount } from "svelte";
	import { Chart } from "chart.js/auto";
	import { validGraphFields } from "@utils/ball-dont-lie-api";

	export let selectedPlayers: SelectedPlayer[] = [];
	export let selectedTab: "allGameStatsForSeason" | "last10GameStats";
	let ctx: HTMLCanvasElement | null;
	let myChart: Chart<"line", any[], string>;
	const color: string[] = ["red", "blue", "black", "teal", "green"];

	onMount(() => {
		ctx = document.querySelector("canvas");
		if (!ctx) throw new Error("Can't find chart element");
		const chartOptions: ChartConfiguration<"line", any[], string> = {
			type: "line",
			data: {
				labels: selectedPlayers[0][selectedTab].map((stats, i) => ` Game ${i + 1}`),
				datasets: selectedPlayers.map((player) => ({
					label: player.first_name + " " + player.last_name,
					data: player[selectedTab].map((game) => game[filteredField]),
				})),
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		};

		myChart = new Chart(ctx, chartOptions);
		return () => myChart.destroy();
	});

	$: filteredField = "pts";
	$: if (myChart) {
		myChart.data = {
			labels: selectedPlayers[0][selectedTab].map((stats, i) => ` Game ${i + 1}`),
			datasets: selectedPlayers.flatMap((player, i) => ({
				label: player.first_name + " " + player.last_name,
				data: player[selectedTab].map((game) => game[filteredField]),
				fill: false,
				borderColor: color[i],
			})),
		};
		myChart.update();
	}
</script>

<div class="mt-20 mb-10 max-w-[500px] mx-auto">
	<label
		for="filter-field"
		class="text-sm font-medium text-gray-700">Filter Field</label>
	<select
		id="filter-field"
		name="filter-field"
		on:change={(evt) => (filteredField = evt.target.value)}
		class="mt-1 capitalize w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500">
		{#each Object.keys(validGraphFields) as field}
			{#if field != "player_id" && field != "season"}
				<option
					selected={field == "pts"}
					value={field}>{validGraphFields[field]}</option>
			{/if}
		{/each}
	</select>
</div>

<canvas id="season-stats-chart" />
