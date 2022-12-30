<script>
	import GithubIcon from "@components/icons/GithubIcon.svelte";
</script>

<div
	id="intro"
	class="prose max-w-screen-xl mx-auto">
	<div class="flex flex-col items-center mb-20">
		<h1 class="capitalize">Welcome to my NBA fantasy stats tool</h1>
		<a
			href="https://github.com/Tyson910/nba-stats-tool"
			target="_blank"
			rel="noreferrer nooopener"
			class="-mt-3 flex flex-row items-center hover:text-gray-400 gap-x-2 no-underline  group-hover:underline"
			>Source Code <GithubIcon /></a>
	</div>
	<p>Fantasy scoring on this site are based on ESPN's old scoring style calculated as follows:</p>
	<p>
		<strong>Points</strong> + <strong>Rebounds</strong> + <strong>Steals</strong> +
		<strong>Blocks</strong> + (<strong>Field Goals Made</strong> -
		<strong>Field Goals Attemped</strong>) + (<strong>Free Throws Made</strong> -
		<strong>Free Throws Attemped</strong>) + (<strong>Assists</strong> - <strong>Turnovers</strong>)
	</p>
	<h3>Directions</h3>
	<ol>
		<li>Search and select up to 5 players</li>
		<li>Browse through each players season averages</li>
		<li>Compare players stats visually by using the graph</li>
	</ol>
</div>
