import { getNoteBySlug, getNotesMetadata } from '$lib/server/content-loader';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	try {
		const note = getNoteBySlug(params.slug);

		if (!note || note.frontmatter.category !== 'note') {
			throw error(404, 'Note not found');
		}

		// Get related notes by tags
		const allNotes = getNotesMetadata();
		const relatedNotes = allNotes
			.filter(
				(n) =>
					n.slug !== note.slug && n.tags.some((tag) => note.frontmatter.tags.includes(tag))
			)
			.slice(0, 3);

		return {
			note: {
				slug: note.slug,
				title: note.frontmatter.title,
				category: note.frontmatter.category,
				tags: note.frontmatter.tags,
				created: note.frontmatter.created,
				updated: note.frontmatter.updated,
				description: note.frontmatter.description,
				content: note.content,
				readingTime: note.readingTime,
				wordCount: note.wordCount,
				backlinks: note.backlinks
			},
			relatedNotes
		};
	} catch (err) {
		console.error('Error loading note:', err);
		throw error(404, 'Note not found');
	}
};
