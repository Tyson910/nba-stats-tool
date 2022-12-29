<script>
	import GithubIcon from "@components/icons/GithubIcon.svelte";
</script>

<div
	id="intro"
	class="prose max-w-screen-xl mx-auto">
	<h1>Hello welcome to my NBA fantasy stats tool</h1>
	<div class="group">
		<a
			href="https://github.com/Tyson910/nba-stats-tool"
			target="_blank"
			rel="noreferrer nooopener"
			class="flex flex-row items-center gap-x-2 no-underline  group-hover:underline"
			>Source Code <GithubIcon svgClasses="group-hover:text-gray-500" /></a>
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
