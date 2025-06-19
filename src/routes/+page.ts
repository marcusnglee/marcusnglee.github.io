import type { Work } from "$lib/components/Portfolio.svelte";
import type { PageLoad } from "./$types";

const works: Work[] = [
  {
    category: "Professional Experience",
    title: "Software Engineer @ Arrowstreet Capital",
    img: "/arrowstreet_logo.png",
    description: "Research Systems: Compute Platform",
    link: "https://www.arrowstreetcapital.com/",
  },
];

export const load: PageLoad = () => {
  return { works };
};
