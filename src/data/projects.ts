export type ProjectStatus = "live" | "npm" | "github" | "private";

export interface Project {
  title: string;
  stack: string[];
  desc: string;
  status: ProjectStatus;
  link?: string;
  github?: string;
}

const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "LIVE",
  npm: "NPM",
  github: "GITHUB",
  private: "PRIVATE",
};

export const statusLabel = (s: ProjectStatus) => STATUS_LABEL[s];

export const projects: Project[] = [
  {
    title: "Late Night Vibes",
    stack: ["React", "TypeScript"],
    status: "live",
    link: "https://late-night-vibes.vuongvu.xyz/",
    github: "https://github.com/vuongvu1/late-night-vibes",
    desc: "Enjoy a variety of live lofi radio channels through an exquisite online player.",
  },
  {
    title: "EA Creative Hub",
    stack: ["React", "Redux", "Nuxeo"],
    status: "private",
    desc: "An internal Content Management System made for EA products.",
  },
  {
    title: "Design Language System",
    stack: ["React", "Storybook"],
    status: "private",
    desc: "An enterprise-level design system with high-quality components, performance optimized, to create a similar user experience among Singtel products.",
  },
  {
    title: "PassGoWhere",
    stack: ["React", "TypeScript", "Tailwind"],
    status: "live",
    link: "https://exitpass.mom.gov.sg/",
    desc: "A web application that allows Singapore foreign workers to apply for an Exit Pass to go outside of their dormitories within specific timeslots, in order to control the spread of COVID-19.",
  },
  {
    title: "Wiretap for Chrome",
    stack: ["React", "Redux", "Node.js"],
    status: "live",
    link: "https://blog.wiretap.co/",
    desc: "A Chrome extension that lets users comment, share, and socialize while using Netflix.",
  },
  {
    title: "react-easy-localization",
    stack: ["JavaScript", "Babel"],
    status: "npm",
    link: "https://www.npmjs.com/package/react-easy-localization",
    github: "https://github.com/vuongvu1/react-easy-localization",
    desc: "A simple Node module that helps React applications implement language internationalization easily.",
  },
  {
    title: "Today I Learned",
    stack: ["React", "Gatsby"],
    status: "live",
    link: "https://til.vuongvu.xyz/",
    github: "https://github.com/vuongvu1/today-i-learned",
    desc: "A place where I share what I've learned, keep notes, and refer to when necessary.",
  },
  {
    title: "react-popover-lite",
    stack: ["React", "TypeScript"],
    status: "npm",
    link: "https://www.npmjs.com/package/react-popover-lite",
    github: "https://github.com/vuongvu1/react-popover-lite",
    desc: "A simple popover React higher-order component with zero dependencies and TypeScript support.",
  },
  {
    title: "github-issues-explorer",
    stack: ["React", "TypeScript", "GraphQL"],
    status: "github",
    github: "https://github.com/vuongvu1/github-issues-explorer",
    desc: "A small client application using the GitHub GraphQL API.",
  },
];
