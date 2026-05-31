export interface SkillGroup {
  title: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    title: "Languages",
    items: ["JavaScript", "HTML", "CSS", "TypeScript"],
  },
  {
    title: "Technologies",
    items: ["React", "Redux", "React Native", "GraphQL", "Node.js", "Storybook"],
  },
  {
    title: "Tools",
    items: ["VSCode", "Docker", "Git"],
  },
];
