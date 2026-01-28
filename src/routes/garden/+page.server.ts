import { getNotesMetadata } from '$lib/server/content-loader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	try {
		const notes = getNotesMetadata();

		// Sort by date (newest first)
		const sortedNotes = notes.sort((a, b) => {
			const dateA = new Date(a.created);
			const dateB = new Date(b.created);
			return dateB.getTime() - dateA.getTime();
		});

		// Group by category
		const essays = sortedNotes.filter((n) => n.category === 'essay');
		const notesList = sortedNotes.filter((n) => n.category === 'note');
		const projects = sortedNotes.filter((n) => n.category === 'project');

		return {
			allNotes: sortedNotes,
			essays,
			notes: notesList,
			projects
		};
	} catch (error) {
		console.error('Error loading garden notes:', error);
		return {
			allNotes: [],
			essays: [],
			notes: [],
			projects: []
		};
	}
};
