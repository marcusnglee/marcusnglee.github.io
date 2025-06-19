import type { Work } from "$lib/components/Portfolio.svelte";
import type { PageLoad } from "./$types";

// --------WORKS------------
const works: Work[] = [
  {
    category: "Professional Experience",
    title: "Software Engineer @ Arrowstreet Capital",
    img: "/arrowstreet_logo.png",
    description: "Research Systems: Compute Platform",
    link: "https://www.arrowstreetcapital.com/",
  },
  {
    category: "Professional Experience",
    title: "Software Engineer @ Gojo Labs",
    img: "/doubleup_logo.jpg",
    description:
      "Frontend and Smart Contract develoepr for DoubleUp Citizens product launch",
    link: "https://www.doubleup.fun/",
  },
  {
    category: "Professional Experience",
    title: "Cloud Engineer @ Agilysys",
    img: "/agilysys_logo.png",
    description: "Automated deployment and DR for kubernetes clusters",
    link: "https://www.agilysys.com/",
  },
  {
    category: "Project",
    title: "Flowr",
    img: "/flowr.png",
    description:
      "decentralized music platform for transparent data, payments, and ownership",
    link: "https://github.com/flowrpowr",
  },
  {
    category: "Professional Experience",
    title: "Audio Engineer @ Vibe Studios Vegas",
    img: "/vibes_studio.jpg",
    description: "recording and mixing",
    link: "https://vibestudiosvegas.com/",
  },
];

export const load: PageLoad = () => {
  return { works };
};
