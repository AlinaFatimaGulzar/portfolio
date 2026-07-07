export type Project = {
  id: number;
  title: string;
  description: string;
  platforms: string[];
  year: string;
  screen: string;
  link: string;
};

export const projects: Project[] = [
  { id: 1, title: "Calm App", description: "A mindful daily planner.", platforms: ["iOS", "Android"], year: "2024", screen: "/assets/screens/calm.webm", link: "#" },
  { id: 2, title: "Swift Commerce", description: "E-commerce, rebuilt fast.", platforms: ["Flutter Web", "iOS", "Android"], year: "2023", screen: "/assets/screens/commerce.webm", link: "#" },
  { id: 3, title: "Pulse Health", description: "Health tracking, no noise.", platforms: ["iOS", "Android"], year: "2023", screen: "/assets/screens/pulse.webm", link: "#" },
];
