export interface ToolkitItem {
  name: string;
  icon: string;
  bg: string;
  description: string;
}

export const mobileToolkit: ToolkitItem[] = [
  { name: "Flutter", icon: "F", bg: "#02569B", description: "Cross-platform UI framework" },
  { name: "Dart", icon: "D", bg: "#0175C2", description: "Type-safe language" },
  { name: "Firebase", icon: "FB", bg: "#FFCA28", description: "Backend & analytics" },
  { name: "Riverpod", icon: "RP", bg: "#6C47FF", description: "State management" },
  { name: "Bloc", icon: "B", bg: "#E74C3C", description: "Predictable state" },
  { name: "SQLite", icon: "S", bg: "#003B57", description: "Local persistence" },
  { name: "GetIt", icon: "GI", bg: "#1A1A2E", description: "DI container" },
  { name: "REST", icon: "R", bg: "#4A5568", description: "API integration" },
  { name: "Push", icon: "PN", bg: "#6B21A8", description: "Push notifications" },
  { name: "Codemagic", icon: "CM", bg: "#F57C00", description: "CI/CD pipeline" },
  { name: "Fastlane", icon: "FL", bg: "#00F200", description: "Automated releases" },
  { name: "Kotlin", icon: "K", bg: "#7F52FF", description: "Native Android interop" },
  { name: "Swift", icon: "S", bg: "#F05138", description: "Native iOS interop" },
  { name: "Figma", icon: "F", bg: "#F24E1E", description: "Design handoff" },
];

export const webToolkit: ToolkitItem[] = [
  { name: "Flutter Web", icon: "FW", bg: "#02569B", description: "Cross-platform web from shared Dart code" },
  { name: "Supabase", icon: "S", bg: "#3ECF8E", description: "Auth, database, real-time" },
  { name: "Firebase", icon: "F", bg: "#FFCA28", description: "Push, analytics, remote config" },
  { name: "GitHub Actions", icon: "GA", bg: "#2088FF", description: "CI/CD automation" },
  { name: "Vercel", icon: "V", bg: "#000000", description: "Hosting & edge deployment" },
  { name: "Figma", icon: "F", bg: "#F24E1E", description: "Design to code handoff" },
  { name: "Docker", icon: "D", bg: "#2496ED", description: "Containerised local dev" },
  { name: "VS Code", icon: "VS", bg: "#007ACC", description: "Primary IDE" },
  { name: "Dart", icon: "D", bg: "#0175C2", description: "Language for everything" },
];

export const webToolkitVersions: Record<string, string> = {
  "Flutter Web": "v3.x",
  "Supabase": "production",
  "Firebase": "production",
  "GitHub Actions": "primary",
  "Vercel": "primary",
  "Figma": "daily",
  "Docker": "tooling",
  "VS Code": "daily",
  "Dart": "core",
};
