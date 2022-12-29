export interface Team {
  id: number;
  /** SAC */
  abbreviation: string;
  /** Sacramento */
  city: string;
  conference: "East" | "West";
  division: string;
  /** Sacramento Kings  */
  full_name: string;
  /** Kings */
  name: string;
}
