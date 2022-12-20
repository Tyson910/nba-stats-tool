<script lang="ts">
	import type { Player } from "@local-types/ball-dont-lie";
	import { getContext } from "svelte";
	const { addPlayerToSelectedPlayers } = getContext("selectedPlayers");
	import { searchPlayerName } from "@utils/ball-dont-lie-api";
	import PlayerListItem from "@components/select-player/PlayerListItem.svelte";
	import EmptyState from "@components/select-player/EmptyState.svelte";

	export let selectedPlayersIDs: Player["id"][] = [];

	let userSearchInput = "";
	let playerSearchErrorMessage = "";
	let playerSearchResults: Player[] = [];

	async function handlePlayerSearchSubmit(evt: SubmitEvent) {
		if (!userSearchInput) {
			playerSearchErrorMessage = "Please enter a valid name";
			return;
		}
		try {
			playerSearchResults = await searchPlayerName(userSearchInput);
			if (playerSearchResults.length === 0) {
				playerSearchErrorMessage = `"${userSearchInput}" couldn't be found. Try another player`;
			}
		} catch (err) {
			console.log(err);
			playerSearchErrorMessage = `An Error occured "${err.message}". Please try again later`;
		}
	}

	function handleAddBtnClick(selectedPlayerID: Player["id"]) {
		// handle this error
		if (!selectedPlayerID) return;
		const player = playerSearchResults.find(({ id }) => id == selectedPlayerID);
		// handle this error
		if (!player) return;
		addPlayerToSelectedPlayers(player);
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
	<!-- TODO: add loading state icon -->
	<button
		class="bg-green-800 text-green-50 w-max self-end py-1 px-3 rounded-lg"
		type="submit">Search</button>
</form>
<section class="max-w-lgmx-auto my-4">
	{#each playerSearchResults as player (player.id)}
		<PlayerListItem
			{player}
			disabled={selectedPlayersIDs.includes(player.id) || selectedPlayersIDs.length > 4}
			on:click={() => handleAddBtnClick(player.id)} />
	{:else}
		<EmptyState />
	{/each}
</section>
