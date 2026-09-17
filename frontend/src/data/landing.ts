/**
 * Landing page static data
 * All mock/placeholder data used in the landing page lives here.
 */

export interface ProjectPreview {
  id: string;
  title: string;
  genre: string;
  logline: string;
  directorName: string;
  directorAvatar: string;
  posterUrl: string;
  rolesOpen: number;
  status: "In Production" | "Pre-Production" | "Post-Production";
}

export const SAMPLE_PROJECTS: ProjectPreview[] = [
  {
    id: "proj-1",
    title: "Echoes of Neon Dust",
    genre: "Sci-Fi / Neo-Noir",
    logline:
      "In a rain-drenched subterranean city, a rogue frequency technician unearths an analog audio tape containing memories that are not his own.",
    directorName: "Elena Rostova",
    directorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80",
    rolesOpen: 3,
    status: "Pre-Production",
  },
  {
    id: "proj-2",
    title: "The Cartographer's Shadow",
    genre: "Historical Thriller",
    logline:
      "An obsessive 19th-century hydrographer discovers an uncharted archipelago where magnetic compasses reverse and shadows detach.",
    directorName: "Marcus Vance",
    directorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=900&q=80",
    rolesOpen: 2,
    status: "In Production",
  },
  {
    id: "proj-3",
    title: "Symphony in Salt",
    genre: "Arthouse Drama",
    logline:
      "A retired concert cellist isolates herself on a high-altitude Andean salt flat to record the sonic resonance of salt crystallizations.",
    directorName: "Aoi Takahashi",
    directorAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=900&q=80",
    rolesOpen: 4,
    status: "Pre-Production",
  },
];

export interface FeatureCard {
  id: string;
  badge: string;
  title: string;
  description: string;
}

export const FEATURE_CARDS: FeatureCard[] = [
  {
    id: "feature-crew",
    badge: "Roles & Gigs",
    title: "Precision Crew Calls",
    description:
      "Post specific department role slots with transparent compensation, union rates, and gear requirements. Match with verified cinematographers, sound mixers, and editors.",
  },
  {
    id: "feature-festivals",
    badge: "Global Circuit",
    title: "Festival Circuit Pipelines",
    description:
      "Direct digital pipeline to Academy-qualifying and independent international film festivals. Track judging statuses, screening links, and early-bird deadlines.",
  },
  {
    id: "feature-trust",
    badge: "Anti-Scam Standard",
    title: "Verified Industry Trust Score",
    description:
      "Peer-reviewed feedback authenticated by production contracts and verified credits. Filter talent by set performance, punctuality, and technical mastery.",
  },
];

export const METRICS = [
  { metric: "1,420+", label: "Verified Projects", highlight: true },
  { metric: "8,900+", label: "Master Technicians", highlight: false },
  { metric: "240+", label: "Partner Festivals", highlight: true },
  { metric: "4.92 ★", label: "Network Trust Avg", highlight: false },
];

export type RoleId = "filmmaker" | "crew" | "organization";

export const ROLES: { id: RoleId; label: string }[] = [
  { id: "filmmaker", label: "Join as Filmmaker" },
  { id: "crew", label: "Join as Crew" },
  { id: "organization", label: "Join as Organization" },
];
