import { getNotesByTag } from '$lib/server/content-loader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	try {
		const tag = decodeURIComponent(params.tag);
		const notes = getNotesByTag(tag);

		// Sort by date (newest first)
		const sortedNotes = notes.sort((a, b) => {
			const dateA = new Date(a.frontmatter.created);
			const dateB = new Date(b.frontmatter.created);
			return dateB.getTime() - dateA.getTime();
		});

		return {
			tag,
			notes: sortedNotes.map((note) => ({
				slug: note.slug,
				title: note.frontmatter.title,
				category: note.frontmatter.category,
				description: note.frontmatter.description,
				created: note.frontmatter.created,
				updated: note.frontmatter.updated,
				tags: note.frontmatter.tags,
				readingTime: note.readingTime
			}))
		};
	} catch (error) {
		console.error('Error loading notes by tag:', error);
		return {
			tag: params.tag,
			notes: []
		};
	}
};
