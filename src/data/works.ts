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

const u = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const WORKS: Work[] = [
  {
    id: 1,
    title: "Chromatic Relic No.4",
    year: 2025,
    medium: "Light installation — steel, glass & photon",
    category: "Masterpiece",
    dimensions: "640 × 220 × 220 cm",
    edition: "Unique piece",
    image: u("photo-1618005182384-a83a8bd57fbe", 2000),
    description:
      "A suspended field of refracted light held in cold-rolled steel. The relic breathes with the room — visitors move through gradients that shift from ember to deep violet as the day collapses into evening.",
  },
  {
    id: 2,
    title: "Vessel of Silence",
    year: 2024,
    medium: "Sculpture — polished chrome & blown glass",
    category: "Masterpiece",
    dimensions: "118 × 64 × 64 cm",
    edition: "1 of 3",
    image: u("photo-1633167606207-d840b5070fc2", 1400),
    description:
      "Chrome folded until it behaves like liquid. The vessel holds nothing but the room itself — a mirror for the quiet we rarely afford ourselves.",
  },
  {
    id: 3,
    title: "Nocturne 07",
    year: 2024,
    medium: "Digital material study — volumetric render",
    category: "Art",
    dimensions: "8K render, infinite",
    edition: "Edition of 12",
    image: u("photo-1620641788421-7a1c342ea42e", 1400),
    description:
      "Part of an ongoing nocturne cycle: simulated atmospheres where pigment is replaced by wavelength. Study 07 maps the exact blue of a city at 3:41 a.m.",
  },
  {
    id: 4,
    title: "Hollow Light",
    year: 2023,
    medium: "Kinetic light object — aluminium & LED",
    category: "Art",
    dimensions: "240 × 90 × 90 cm",
    edition: "Unique piece",
    image: u("photo-1634017839464-5c339ebe3cb4", 1400),
    description:
      "A slow-turning column that carves shadows into architecture. Light here is not emitted — it is excavated from the dark around it.",
  },
  {
    id: 5,
    title: "Strata",
    year: 2023,
    medium: "Pigment on brushed steel",
    category: "Masterpiece",
    dimensions: "310 × 180 cm",
    edition: "Unique piece",
    image: u("photo-1541701494587-cb58502866ab", 1400),
    description:
      "Sedimentary colour pressed into metal — a landscape compressed to the thickness of a breath. The surface changes temperament under gallery light.",
  },
  {
    id: 6,
    title: "Event Horizon",
    year: 2022,
    medium: "Smoke & resin cast",
    category: "Art",
    dimensions: "95 × 95 × 40 cm",
    edition: "1 of 5",
    image: u("photo-1518640467707-6811f4a6ab73", 1400),
    description:
      "Actual smoke, arrested mid-motion inside optical resin. A frozen collapse — the moment a form decides to disappear.",
  },
  {
    id: 7,
    title: "Molten Cartography",
    year: 2025,
    medium: "Generative print on anodised aluminium",
    category: "Masterpiece",
    dimensions: "150 × 150 cm",
    edition: "Edition of 8",
    image: u("photo-1553356084-58ef4a67b2a7", 1400),
    description:
      "Terrain drawn by heat-diffusion algorithms and etched into metal. A map of a place that exists only in computation, rendered permanent.",
  },
  {
    id: 8,
    title: "Signal Bloom",
    year: 2022,
    medium: "Real-time render — sound-reactive",
    category: "Art",
    dimensions: "Variable, screen-based",
    edition: "Open edition",
    image: u("photo-1617791160536-598cf32026fb", 1400),
    description:
      "A flower that grows from voice. Whisper and it hesitates; sing and it unfolds. Installed permanently in the foyer of Halle 14, Leipzig.",
  },
  {
    id: 9,
    title: "Threshold II",
    year: 2021,
    medium: "Light corridor — fog & tungsten",
    category: "Art",
    dimensions: "12 m corridor",
    edition: "Site-specific",
    image: u("photo-1549490349-8643362247b5", 1400),
    description:
      "Twelve metres of warm fog and a single filament. Walkers slow down without being asked to. The work is the pause, not the corridor.",
  },
];

export interface Exhibition {
  year: string;
  title: string;
  venue: string;
  location: string;
  type: string;
}

export const EXHIBITIONS: Exhibition[] = [
  {
    year: "2026",
    title: "Threshold of Light",
    venue: "König Digital",
    location: "Berlin, DE",
    type: "Solo — upcoming",
  },
  {
    year: "2025",
    title: "Matter, Suspended",
    venue: "HALLE 14",
    location: "Leipzig, DE",
    type: "Group",
  },
  {
    year: "2025",
    title: "Nocturne Cycle",
    venue: "Palazzo Monti",
    location: "Brescia, IT",
    type: "Solo",
  },
  {
    year: "2024",
    title: "Chromatic Relics",
    venue: "Galerie Nord",
    location: "Berlin, DE",
    type: "Solo",
  },
  {
    year: "2023",
    title: "Vessels of Silence",
    venue: "Kunsthalle Annex",
    location: "Vienna, AT",
    type: "Group",
  },
  {
    year: "2022",
    title: "First Light",
    venue: "Studio Rove",
    location: "Copenhagen, DK",
    type: "Debut solo",
  },
];

export const PORTRAIT = u("photo-1531746020798-e6953c6e8e04", 1100);

export const SOCIALS = [
  { label: "Instagram", handle: "@artist", href: "https://instagram.com" },
  { label: "Behance", handle: "artist", href: "https://behance.net" },
  { label: "X / Twitter", handle: "@artist", href: "https://x.com" },
  { label: "Vimeo", handle: "artiststudio", href: "https://vimeo.com" },
] as const;

export const EMAIL = "hello@artist.studio";
