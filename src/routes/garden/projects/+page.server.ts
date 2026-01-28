import { getNotesByCategory } from '$lib/server/content-loader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	try {
		const projects = getNotesByCategory('project');

		// Sort by date (newest first)
		const sortedProjects = projects.sort((a, b) => {
			const dateA = new Date(a.frontmatter.created);
			const dateB = new Date(b.frontmatter.created);
			return dateB.getTime() - dateA.getTime();
		});

		return {
			projects: sortedProjects.map((project) => ({
				slug: project.slug,
				title: project.frontmatter.title,
				category: project.frontmatter.category,
				description: project.frontmatter.description,
				created: project.frontmatter.created,
				updated: project.frontmatter.updated,
				tags: project.frontmatter.tags,
				readingTime: project.readingTime
			}))
		};
	} catch (error) {
		console.error('Error loading projects:', error);
		return { projects: [] };
	}
};
