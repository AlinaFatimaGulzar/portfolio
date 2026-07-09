export type Project = {
  id: number;
  title: string;
  description: string;
  platforms: string[];
  year: string;
  screen: string;
  link: string;
  color: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "aligulzar.com",
    description: "A full-featured e-commerce platform with product management, cart, checkout, and payment integration.",
    platforms: ["Web"],
    year: "2025",
    screen: "/assets/screens/commerce.webm",
    link: "https://aligulzar.com",
    color: "#56E8C5",
  },
  {
    id: 2,
    title: "Baby Name Generator",
    description: "A Flutter app that generates unique baby names with meanings, origins, and favorites management.",
    platforms: ["Android"],
    year: "2025",
    screen: "/assets/screens/baby.webm",
    link: "https://play.google.com/store/apps/details?id=com.superappbox.babynamegenerator&hl=en",
    color: "#ff9f68",
  },
  {
    id: 3,
    title: "AuraPlay",
    description: "A video streaming app with smooth playback, curated content categories, and user playlists.",
    platforms: ["Android"],
    year: "2025",
    screen: "/assets/screens/aura.webm",
    link: "#",
    color: "#7C8CFF",
  },
  {
    id: 4,
    title: "Pet Name Generator",
    description: "A fun Flutter app that suggests creative pet names by breed, personality, and style preferences.",
    platforms: ["Android"],
    year: "2025",
    screen: "/assets/screens/pet.webm",
    link: "#",
    color: "#4ADE80",
  },
  {
    id: 5,
    title: "E-Commerce App",
    description: "A cross-platform shopping app with real-time inventory, order tracking, and Firebase sync.",
    platforms: ["Android", "iOS"],
    year: "2024",
    screen: "/assets/screens/commerce.webm",
    link: "#",
    color: "#FFB454",
  },
  {
    id: 6,
    title: "Edu Learn",
    description: "An interactive learning platform with courses, quizzes, progress tracking, and student dashboards.",
    platforms: ["Android", "iOS"],
    year: "2024",
    screen: "/assets/screens/edu.webm",
    link: "#",
    color: "#f15b7b",
  },
];
