import { getNotesMetadata } from '$lib/server/content-loader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	try {
		const allNotes = getNotesMetadata();

		// Sort by date (newest first)
		const sortedNotes = allNotes.sort((a, b) => {
			const dateA = new Date(a.created);
			const dateB = new Date(b.created);
			return dateB.getTime() - dateA.getTime();
		});

		return {
			notes: sortedNotes
		};
	} catch (error) {
		console.error('Error loading garden:', error);
		return { notes: [] };
	}
};
