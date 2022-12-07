<script lang="ts">
  export let player = null;
  let { id, position, first_name, last_name, team } = player;
</script>

<li>
  {first_name}
  {last_name} - {team.abbreviation}
  {position}
  <span class=""> x </span>
</li>
