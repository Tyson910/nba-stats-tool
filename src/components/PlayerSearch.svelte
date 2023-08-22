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
	<label
		class="flex flex-col font-medium text-gray-700"
		for="player-search">
		Player Name
	</label>
	<input
		name="player-search"
		id="player-search"
		type="text"
		class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
		required
		bind:value={userSearchInput} />
	<p
		class="text-sm text-red-500"
		id="email-description">
		{playerSearchErrorMessage}
	</p>
	<button
		class="bg-indigo-600 text-green-50 w-max self-end py-2 px-3 rounded-lg inline-flex items-center"
		type="submit"
		class:animate-pulse={isLoading}
		>Search
		{#if isLoading}
			<Spinner />
		{/if}
	</button>
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
