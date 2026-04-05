/**
 * Processes Obsidian image embeds
 * ![[image.png]] -> ![image](/path/to/image.png)
 */
export function processEmbeds(content: string, imagesPath: string = '/content/garden'): string {
	// Match ![[filename.ext]]
	const embedRegex = /!\[\[([^\]]+\.(png|jpg|jpeg|gif|svg|webp))\]\]/gi;

	return content.replace(embedRegex, (match, filename) => {
		// Clean the filename
		const cleanFilename = filename.trim();
		// Build the image path
		const imagePath = `${imagesPath}/${cleanFilename}`;
		// Return markdown image syntax
		return `![${cleanFilename}](${imagePath})`;
	});
}

/**
 * Processes Obsidian callouts/admonitions
 * > [!note] Title
 * > Content
 * -> <aside class="callout callout-note">...</aside>
 */
export function processCallouts(content: string): string {
	// Match callout blocks
	const calloutRegex = /^> \[!(\w+)\]\s*(.*)?\n((?:> .*\n?)*)/gm;

	return content.replace(calloutRegex, (match, type, title, body) => {
		// Clean up the body content (remove leading > and spaces)
		const cleanBody = body
			.split('\n')
			.map((line: string) => line.replace(/^>\s?/, ''))
			.join('\n')
			.trim();

		// Build the HTML
		let html = `<aside class="callout callout-${type.toLowerCase()}">\n`;

		if (title && title.trim()) {
			html += `  <div class="callout-title">${title.trim()}</div>\n`;
		}

		if (cleanBody) {
			html += `  <div class="callout-content">\n\n${cleanBody}\n\n  </div>\n`;
		}

		html += `</aside>`;

		return html;
	});
}

/**
 * Processes Obsidian highlights
 * ==highlighted text== -> <mark>highlighted text</mark>
 */
export function processHighlights(content: string): string {
	return content.replace(/==([^=]+)==/g, '<mark>$1</mark>');
}

/**
 * Processes all Obsidian syntax
 */
export function processObsidianSyntax(content: string, imagesPath?: string): string {
	let processed = content;

	// Process in order
	processed = processCallouts(processed);
	processed = processEmbeds(processed, imagesPath);
	processed = processHighlights(processed);

	return processed;
}
