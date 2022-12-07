<script lang="ts">
  export let player = null;
  let { id, position, first_name, last_name, team } = player;
</script>

<label>
  <input type="checkbox" bind:value={id} id={id + "cbox"} />
  {first_name}
  {last_name} - {team.abbreviation}
  {position}
</label>
