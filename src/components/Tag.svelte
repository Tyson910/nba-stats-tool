<span
	class="inline-flex w-max md:w-auto items-center rounded-full bg-indigo-100 py-2 pl-4 pr-3 text-sm font-medium text-indigo-700">
	<slot />
	<button
		on:click
		type="button"
		class={`ml-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full
     text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none`}>
		<span class="sr-only">Remove TODO: add slot text option</span>
		<svg
			class="h-2 w-2"
			stroke="currentColor"
			fill="none"
			viewBox="0 0 8 8">
			<path
				stroke-linecap="round"
				stroke-width="1.5"
				d="M1 1l6 6m0-6L1 7" />
		</svg>
	</button>
</span>
