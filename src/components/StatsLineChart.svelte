<script lang="ts">
	import type { SelectedPlayer } from "@local-types/ball-dont-lie";
	import type { ChartConfiguration } from "chart.js";
	import { onMount } from "svelte";
	import { Chart } from "chart.js/auto";
	import { validGraphFields } from "@utils/ball-dont-lie-api";
	import "chartjs-adapter-date-fns";

	export let selectedPlayers: SelectedPlayer[] = [];
	export let selectedTab: "allGameStatsForSeason" | "last10GameStats";

	let ctx: HTMLCanvasElement | null;
	let myChart: Chart<"line", any[], string>;
	const color: string[] = ["gold", "magenta", "green", "blue",  "black"];

	onMount(() => {
		ctx = document.querySelector("canvas");
		if (!ctx) throw new Error("Can't find chart element");
		const chartConfig: ChartConfiguration<"line", any[], string> = {
			type: "line",
			data: {
				datasets: selectedPlayers.map((player) => ({
					label: player.first_name + " " + player.last_name,
					data: player[selectedTab].map((game) => ({
						// remove time info from date string
						x: new Date(game.game.date.substring(0, 10)).getTime(),
						y: game[filteredField],
					})),
				})),
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
					x: {
						offset: true,
						type: "time",
						time: {
							unit: "day",
						},
					},
				},
			},
		};

		myChart = new Chart(ctx, chartConfig);

		return () => myChart.destroy();
	});

	$: filteredField = "pts";
	$: if (myChart) {
		myChart.data = {
			datasets: selectedPlayers.map((player, i) => ({
				label: player.first_name + " " + player.last_name,
				data: player[selectedTab].map((game, i) => ({
					// remove time info from date string
					x: new Date(game.game.date.substring(0, 10)).getTime(),
					y: game[filteredField],
				})),
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
