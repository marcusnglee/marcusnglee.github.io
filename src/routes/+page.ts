import type { Work } from "$lib/components/Portfolio.svelte";
import type { PageLoad } from "./$types";
import { base } from "$app/paths";

export const prerender = true;

// --------WORKS------------
const works: Work[] = [
  {
    category: "Professional Experience",
    title: "Software Engineer @ Arrowstreet Capital",
    img: `${base}/arrowstreet_logo.png`,
    description: "Research Systems: Compute Platform",
    link: "https://www.arrowstreetcapital.com/",
  },
  {
    category: "Professional Experience",
    title: "Software Engineer @ Gojo Labs",
    img: `${base}/doubleup_logo.jpg`,
    description:
      "Frontend and Smart Contract develoepr for DoubleUp Citizens product launch",
    link: "https://www.doubleup.fun/",
  },
  {
    category: "Professional Experience",
    title: "Cloud Engineer @ Agilysys",
    img: `${base}/agilysys_logo.png`,
    description: "Automated deployment and DR for kubernetes clusters",
    link: "https://www.agilysys.com/",
  },
  {
    category: "Project",
    title: "Flowr",
    img: `${base}/flowr.png`,
    description:
      "decentralized music platform for transparent data, payments, and ownership",
    link: "https://github.com/flowrpowr",
  },
  {
    category: "Professional Experience",
    title: "Audio Engineer @ Vibe Studios Vegas",
    img: `${base}/vibes_studio.jpg`,
    description: "recording and mixing",
    link: "https://vibestudiosvegas.com/",
  },
];

export const load: PageLoad = () => {
  return { works };
};
