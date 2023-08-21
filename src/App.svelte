<script lang="ts">
	import { setContext } from "svelte";
	import type { SelectedPlayer } from "@local-types/ball-dont-lie";
	import Tag from "@components/Tag.svelte";
	import Intro from "@components/Intro.svelte";
	import PlayerSearch from "@components/PlayerSearch.svelte";
	import Tabs from "@components/Tabs.svelte";
	import { writable } from "svelte/store";

	function removePlayerFromSelectedPlayers(selectedPlayerID: SelectedPlayer["id"]): void {
		// remove from search results
		$selectedPlayers = $selectedPlayers.filter(({ id }) => id != selectedPlayerID);
	}

	const selectedPlayers = writable<SelectedPlayer[]>([])
	setContext('selectedPlayers', selectedPlayers);
</script>

<main class="px-5 py-16 lg:py-20 mx-auto max-w-screen-xl ">
	<Intro />
	<div class="flex flex-row flex-wrap gap-y-6 gap-x-4 my-10 md:my-5 capitalize">
		{#each $selectedPlayers as player (player.id)}
			{@const fullName =`${player?.first_name} ${player?.last_name} `}
			<Tag on:click={() => removePlayerFromSelectedPlayers(player.id)}>{fullName}</Tag>
		{/each}
	</div>
	<PlayerSearch />
	{#if $selectedPlayers.length > 0}
		<Tabs selectedPlayers={$selectedPlayers} />
	{/if}
</main>
