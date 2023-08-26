<script lang="ts">
	import { derived } from "svelte/store";
	import type { Player } from "@local-types/ball-dont-lie";
	import { getSelectedPlayers } from "@utils/context";
	import {
		getAllGameStatsForSeason,
		getPlayerSeasonAverages,
		searchPlayerName,
	} from "@utils/ball-dont-lie-api";
	import PlayerListItem from "@components/select-player/PlayerListItem.svelte";
	import EmptyState from "@components/select-player/EmptyState.svelte";
	import Spinner from "@components/icons/Spinner.svelte";

	let userSearchInput = "";
	let playerSearchErrorMessage = "";
	let isLoading = false;
	let playerSearchResults: Player[] = [];

	const selectedPlayers = getSelectedPlayers();
	const selectedPlayersIDs = derived(selectedPlayers, ($selectedPlayers) =>
		$selectedPlayers.map(({ id }) => id)
	);

	async function handlePlayerSearchSubmit(evt: SubmitEvent) {
		isLoading = true;
		if (!userSearchInput) {
			playerSearchErrorMessage = "Please enter a valid name";
			return;
		}
		try {
			playerSearchResults = await searchPlayerName(userSearchInput);
			if (playerSearchResults.length === 0) {
				playerSearchErrorMessage = `"${userSearchInput}" couldn't be found. Try searching for an active player`;
			} else {
				playerSearchErrorMessage = "";
			}
		} catch (err) {
			console.log(err);
			playerSearchErrorMessage = `An Error occured "${err.message}". Please try again later`;
		} finally {
			isLoading = false;
		}
	}

	async function handleAddBtnClick(selectedPlayerID: Player["id"]) {
		// handle this error
		if (!selectedPlayerID) return;
		const player = playerSearchResults.find(({ id }) => id == selectedPlayerID);
		// handle this error
		if (!player) return;

		try {
			//fetch season stats
			const seasonAverages = await getPlayerSeasonAverages(player.id);
			// handle this error
			if (!seasonAverages) return;
			// fetch last season averages
			const allGameStatsForSeason = await getAllGameStatsForSeason(player.id);
			// get last 10 from array
			const last10GameStats = allGameStatsForSeason.slice(
				allGameStatsForSeason.length - 10,
				allGameStatsForSeason.length
			);

			// add to selected players
			$selectedPlayers = [
				...$selectedPlayers,
				{
					...player,
					seasonAverages,
					allGameStatsForSeason,
					last10GameStats,
				},
			];
		} catch (err) {
			console.log(err);
			return;
		}
	}
</script>

<form
	class="flex flex-col gap-y-2 max-w-lgmx-auto"
	id="search-form"
	on:submit|preventDefault={handlePlayerSearchSubmit}>
	<div>
		<label
			class="flex flex-col font-medium text-gray-700"
			for="player-search">
			Player Name
		</label>
		<p
			class="text-sm text-red-500"
			id="player-search-error-message">
			{playerSearchErrorMessage}
		</p>
		<div class="mt-2 flex rounded-md shadow-sm">
			<input
				type="search"
				name="player-search"
				id="player-search"
				class="w-full min-w-0 flex-1 rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				placeholder="E.g. Keegan Murray"
				required
				bind:value={userSearchInput} />

			<button
				class="bg-indigo-600 py-2 px-5 text-green-50 inline-flex items-center rounded-r-md border border-l-0 border-gray-300 sm:text-sm"
				type="submit"
				class:animate-pulse={isLoading}
				>Search
				{#if isLoading}
					<Spinner />
				{/if}
			</button>
		</div>
	</div>
</form>
<section class="my-4">
	{#each playerSearchResults as player (player.id)}
		<PlayerListItem
			{player}
			disabled={$selectedPlayersIDs.includes(player.id) || $selectedPlayersIDs.length > 4}
			on:click={() => handleAddBtnClick(player.id)} />
	{:else}
		<EmptyState />
	{/each}
</section>
