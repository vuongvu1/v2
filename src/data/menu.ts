export interface NavItem {
  href: string;
  label: string;
  flavor: string;
  desktopOnly?: boolean;
}

/** Left-hand WC3 menu. Plain label + small flavor subtitle. */
export const NAV: NavItem[] = [
  { href: "/", label: "ABOUT", flavor: "The Hero" },
  { href: "/projects", label: "PROJECTS", flavor: "Campaigns" },
  { href: "/timeline", label: "TIMELINE", flavor: "Chronicle" },
  { href: "/skills", label: "SKILLS", flavor: "Arsenal" },
  { href: "/playground", label: "PLAYGROUND", flavor: "The Tavern", desktopOnly: true },
  { href: "/hobbies", label: "HOBBIES", flavor: "Pastimes" },
  { href: "/contact", label: "CONTACT", flavor: "Allies" },
];
