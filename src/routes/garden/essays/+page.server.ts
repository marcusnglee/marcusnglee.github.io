import { getNotesByCategory } from '$lib/server/content-loader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	try {
		const essays = getNotesByCategory('essay');

		// Sort by date (newest first)
		const sortedEssays = essays.sort((a, b) => {
			const dateA = new Date(a.frontmatter.created);
			const dateB = new Date(b.frontmatter.created);
			return dateB.getTime() - dateA.getTime();
		});

		return {
			essays: sortedEssays.map((essay) => ({
				slug: essay.slug,
				title: essay.frontmatter.title,
				description: essay.frontmatter.description,
				created: essay.frontmatter.created,
				updated: essay.frontmatter.updated,
				tags: essay.frontmatter.tags,
				readingTime: essay.readingTime
			}))
		};
	} catch (error) {
		console.error('Error loading essays:', error);
		return { essays: [] };
	}
};
