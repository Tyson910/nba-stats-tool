<script lang="ts">
  export let userSearchInput = "";
</script>

<form class="flex flex-col" id="search-form">
  <label class="flex flex-col" for="player-search"> Player Name </label>
  <input
    name="player-search"
    id="player-search"
    type="text"
    required
    bind:value={userSearchInput}
  />
  <input class="" type="submit" value="Search" />
</form>
