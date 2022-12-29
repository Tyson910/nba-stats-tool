<script lang="ts">
	import type { Player } from "@local-types/ball-dont-lie";
	import { teamPrimaryColorRGB } from "@utils/team-colors";
	import PlusIcon from "@components/icons/PlusIcon.svelte";
	export let player: Player;
	export let disabled: boolean = false;
	$: fullName = player?.first_name + " " + player?.last_name;
	/** RGB Value of team color */
	$: teamColorString = teamPrimaryColorRGB[player.team.abbreviation];
</script>

<li class="flex items-center justify-between space-x-3 py-4">
	<div class="flex min-w-0 flex-1 items-center space-x-3">
		<div class="flex-shrink-0">
			<img
				class="h-8 w-8"
				src={`/nba-logos/${player?.team?.abbreviation.toUpperCase()}.png`}
				alt={`${player?.team?.full_name} logo`}
				loading="lazy" />
		</div>
		<div class="min-w-0 flex-1">
			<p class="truncate text-sm font-medium text-gray-900">
				{fullName}
			</p>
			<p
				class="truncate text-sm font-medium"
				style="color: {teamColorString};">
				{player?.team?.full_name}
			</p>
		</div>
	</div>
	<div class="flex-shrink-0 group">
		<button
			on:click
			{disabled}
			type="button"
			class={`py-2 px-5 inline-flex items-center 
			 rounded-full border border-current hover:bg-current
			 disabled:bg-current
			 group-hover:transition-colors group-hover:duration-300
			 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
			 `}
			style="color: {teamColorString};">
			{#if disabled}
				<span class="text-sm font-medium text-gray-50">
					Already added <span class="sr-only">{fullName}</span>
				</span>
			{:else}
				<span class="text-sm font-medium group-hover:text-gray-50">
					Add <span class="sr-only">{fullName}</span>
				</span>
				<PlusIcon svgClasses="-mr-1 mr-0.5 h-5 w-5 group-hover:text-gray-50" />
			{/if}
		</button>
	</div>
</li>
