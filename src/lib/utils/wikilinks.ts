import type { BackLink } from '$lib/types/garden';

/**
 * Extracts wikilinks from markdown content
 * Supports: [[link]], [[link|display]], [[link#heading]]
 */
export function extractWikilinks(content: string): string[] {
	const wikilinkRegex = /\[\[([^\]]+)\]\]/g;
	const links: string[] = [];
	let match;

	while ((match = wikilinkRegex.exec(content)) !== null) {
		const linkContent = match[1];
		// Extract the actual link (before | or #)
		const linkParts = linkContent.split(/[|#]/);
		const link = linkParts[0].trim();
		if (link) {
			links.push(link);
		}
	}

	return [...new Set(links)]; // Remove duplicates
}

/**
 * Transforms wikilinks to proper markdown links
 * [[link]] -> [link](/garden/notes/link)
 * [[link|display]] -> [display](/garden/notes/link)
 * [[link#heading]] -> [link](/garden/notes/link#heading)
 */
export function transformWikilinks(
	content: string,
	noteMap: Map<string, { category: string; slug: string }>
): string {
	const wikilinkRegex = /\[\[([^\]]+)\]\]/g;

	return content.replace(wikilinkRegex, (match, linkContent) => {
		// Parse the wikilink
		const [linkPart, displayPart] = linkContent.split('|').map((s: string) => s.trim());
		const [link, heading] = linkPart.split('#').map((s: string) => s.trim());

		// Find the note in the map
		const noteInfo = noteMap.get(link);

		if (!noteInfo) {
			// Note not found, return as plain text
			return displayPart || link;
		}

		// Build the URL
		const category = noteInfo.category === 'essay' ? 'essays' : noteInfo.category + 's';
		let url = `/garden/${category}/${noteInfo.slug}`;
		if (heading) {
			url += `#${heading.toLowerCase().replace(/\s+/g, '-')}`;
		}

		// Build the markdown link
		const displayText = displayPart || link;
		return `[${displayText}](${url})`;
	});
}

/**
 * Builds a backlink graph from all notes
 */
export function buildBacklinkGraph(
	notes: Array<{
		slug: string;
		title: string;
		content: string;
	}>
): Map<string, BackLink[]> {
	const backlinkMap = new Map<string, BackLink[]>();

	// Initialize map for all notes
	notes.forEach((note) => {
		backlinkMap.set(note.slug, []);
	});

	// Build backlinks
	notes.forEach((sourceNote) => {
		const links = extractWikilinks(sourceNote.content);

		links.forEach((linkedTitle) => {
			// Find the target note by title
			const targetNote = notes.find((n) => n.title === linkedTitle || n.slug === linkedTitle);

			if (targetNote) {
				const backlinks = backlinkMap.get(targetNote.slug) || [];

				// Extract context (paragraph containing the link)
				const contextMatch = sourceNote.content.match(
					new RegExp(`([^\\n]*\\[\\[${linkedTitle}[^\\]]*\\]\\][^\\n]*)`)
				);
				const context = contextMatch ? contextMatch[1].trim() : undefined;

				backlinks.push({
					slug: sourceNote.slug,
					title: sourceNote.title,
					context
				});

				backlinkMap.set(targetNote.slug, backlinks);
			}
		});
	});

	return backlinkMap;
}

/**
 * Generates a slug from a title or filename
 */
export function generateSlug(filename: string): string {
	return filename
		.replace(/\.md$/, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}
