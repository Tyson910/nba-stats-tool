<script lang="ts">
	import { setContext } from "svelte";
	import type { SelectedPlayer } from "@local-types/ball-dont-lie";
	import Tag from "@components/Tag.svelte";
	import Intro from "@components/Intro.svelte";
	import PlayerSearch from "@components/PlayerSearch.svelte";
	import Tabs from "@components/Tabs.svelte";

	setContext("selectedPlayers", { addPlayerToSelectedPlayers, removePlayerFromSelectedPlayers });
	function addPlayerToSelectedPlayers(player: SelectedPlayer): void {
		// add to selected players
		selectedPlayers = [...selectedPlayers, player];
		// fetch players stats
	}
	function removePlayerFromSelectedPlayers(selectedPlayerID: SelectedPlayer["id"]): void {
		// remove from search results
		selectedPlayers = selectedPlayers.filter(({ id }) => id != selectedPlayerID);
	}

	let selectedPlayers: SelectedPlayer[] = [];
	$: selectedPlayersIDs = selectedPlayers.map(({ id }) => id);
</script>

<main class="mx-auto max-w-screen-xl pb-20">
	<Intro />
	<div class="flex flex-row gap-x-4 my-5 capitalize">
		{#each selectedPlayers as player (player.id)}
			{@const fullName = player?.first_name + " " + player?.last_name}
			<Tag on:click={() => removePlayerFromSelectedPlayers(player.id)}>{fullName}</Tag>
		{/each}
	</div>
	<PlayerSearch {selectedPlayersIDs} />
	{#if selectedPlayers.length > 0}
		<Tabs {selectedPlayers} />
	{/if}
</main>
