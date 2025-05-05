import type { Project } from "$lib/components/Portfolio.svelte";
import type { PageLoad } from "./$types";

const projects: Project[] = [{ title: "flowr", img: "/flowr.png" }];

export const load: PageLoad = () => {
  return { projects };
};
