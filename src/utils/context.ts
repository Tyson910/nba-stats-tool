import type { SelectedPlayer } from "@local-types/ball-dont-lie";
import { getContext } from "svelte";
import type { Writable } from "svelte/store";

function getSelectedPlayers(): Writable<SelectedPlayer[]> {
  const selectedPlayers: Writable<SelectedPlayer[]> | undefined = getContext(
    "selectedPlayers",
  );
  if (!selectedPlayers) {
    throw new Error("Couldn't find 'selectedPlayers' context or store");
  }
  return selectedPlayers;
}

export { getSelectedPlayers };
