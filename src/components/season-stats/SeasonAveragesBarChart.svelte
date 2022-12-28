<script lang="ts">
	import type { PlayerWithSeasonAverage } from "@local-types/ball-dont-lie";
	import { onMount } from "svelte";
	import { teamPrimaryColorRGB } from "@utils/team-colors";
	import { Chart } from "chart.js/auto";
	import type { ChartConfiguration } from "chart.js";
	import { validGraphFields } from "@utils/ball-dont-lie-api";

	export let selectedPlayers: PlayerWithSeasonAverage[] = [];
	let ctx: HTMLCanvasElement | null;
	let myChart: Chart<"bar", any[], string>;

	onMount(() => {
		ctx = document.querySelector("canvas");
		if (!ctx) throw new Error("Can't find chart element");

		const chartOptions: ChartConfiguration<"bar", any[], string> = {
			type: "bar",
			data: {
				labels: selectedPlayers.map((player) => player.first_name + " " + player.last_name),
				datasets: [
					{
						label: `${filteredField} per game`,
						data: selectedPlayers.map((player) => player.seasonAverages[filteredField]),
						borderWidth: 1,
					},
				],
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
		(myChart.data = {
			labels: selectedPlayers.map((player) => player.first_name + " " + player.last_name),
			datasets: [
				{
					label: `${validGraphFields[filteredField]} per game`,
					data: selectedPlayers.map((player) => player.seasonAverages[filteredField]),
					borderWidth: 1,
					backgroundColor: selectedPlayers.map(
						(player) => teamPrimaryColorRGB[player.team.abbreviation]
					),
				},
			],
		}),
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
