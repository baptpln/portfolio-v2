export interface Contact {
  name: string;
  /** Path to a logo asset. Falls back to the name's first letter when absent. */
  logo?: string;
  /** Overrides the avatar's light-mode background, for logos that don't read on bg-muted. */
  lightBg?: string;
  /** Overrides the avatar's dark-mode background (must include the "dark:" prefix). */
  darkBg?: string;
}
