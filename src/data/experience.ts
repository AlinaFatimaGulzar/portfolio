export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "BitStorm Solutions",
    role: "Senior Flutter Developer",
    period: "2023 – Present",
    description: "Led mobile team, shipped 3 production apps with clean architecture and Firebase backends.",
    tech: ["Flutter", "Firebase", "Riverpod"],
  },
  {
    company: "Excelaret x Saint Louis University",
    role: "Flutter Developer",
    period: "2021 – 2023",
    description: "Built consumer app from 0 → 50k users with real-time features and smooth CI/CD pipeline.",
    tech: ["Flutter", "REST", "Bloc"],
  },
];
