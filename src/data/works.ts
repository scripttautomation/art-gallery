export interface Work {
  id: number;
  title: string;
  year: number;
  medium: string;
  category: string;
  dimensions: string;
  edition: string;
  image: string;
  description: string;
  custom?: boolean;
}

/**
 * The wall starts empty — every piece is added by the artist
 * through the "Add your art" studio in the gallery.
 */
export const WORKS: Work[] = [];

export const SOCIALS = [
  { label: "Instagram", handle: "@artist", href: "https://instagram.com" },
  { label: "Behance", handle: "artist", href: "https://behance.net" },
  { label: "X / Twitter", handle: "@artist", href: "https://x.com" },
  { label: "Vimeo", handle: "artiststudio", href: "https://vimeo.com" },
] as const;

export const EMAIL = "hello@artist.studio";
