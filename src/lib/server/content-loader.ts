import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { marked } from 'marked';
import type { NoteFrontmatter, ProcessedNote, NoteMetadata } from '$lib/types/garden';
import {
	extractWikilinks,
	transformWikilinks,
	buildBacklinkGraph,
	generateSlug
} from '$lib/utils/wikilinks';
import { processObsidianSyntax } from '$lib/utils/obsidian-syntax';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'garden');

// Cache for processed notes
let notesCache: ProcessedNote[] | null = null;
let noteMapCache: Map<string, { category: string; slug: string }> | null = null;

/**
 * Recursively finds all markdown files in a directory
 */
function findMarkdownFiles(dir: string): string[] {
	const files: string[] = [];

	try {
		if (!fs.existsSync(dir)) {
			return files;
		}

		const entries = fs.readdirSync(dir, { withFileTypes: true });

		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);

			if (entry.isDirectory()) {
				// Skip hidden directories and common exclusions
				if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
					files.push(...findMarkdownFiles(fullPath));
				}
			} else if (entry.isFile() && entry.name.endsWith('.md')) {
				files.push(fullPath);
			}
		}
	} catch (error) {
		console.error(`Error reading directory ${dir}:`, error);
	}

	return files;
}

/**
 * Parses a single markdown note
 */
function parseNote(filePath: string): ProcessedNote | null {
	try {
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		const { data, content } = matter(fileContent);

		// Validate frontmatter
		const frontmatter = data as NoteFrontmatter;

		// Only process published notes
		if (!frontmatter.published) {
			return null;
		}

		// Ensure required fields
		if (!frontmatter.title || !frontmatter.category) {
			console.warn(`Note missing required frontmatter: ${filePath}`);
			return null;
		}

		// Generate slug from filename
		const filename = path.basename(filePath);
		const slug = generateSlug(filename);

		// Process Obsidian syntax
		let processedContent = processObsidianSyntax(content);

		// Extract wikilinks before transformation
		const outgoingLinks = extractWikilinks(content);

		// Calculate reading time
		const stats = readingTime(content);
		const wordCount = content.split(/\s+/).length;

		return {
			slug,
			frontmatter,
			content: processedContent,
			rawContent: content,
			readingTime: Math.ceil(stats.minutes),
			wordCount,
			backlinks: [], // Will be filled later
			outgoingLinks
		};
	} catch (error) {
		console.error(`Error parsing note ${filePath}:`, error);
		return null;
	}
}

/**
 * Builds a map of note titles/slugs to their metadata
 */
function buildNoteMap(notes: ProcessedNote[]): Map<string, { category: string; slug: string }> {
	const map = new Map<string, { category: string; slug: string }>();

	notes.forEach((note) => {
		// Map both title and slug
		map.set(note.frontmatter.title, {
			category: note.frontmatter.category,
			slug: note.slug
		});
		map.set(note.slug, {
			category: note.frontmatter.category,
			slug: note.slug
		});
	});

	return map;
}

/**
 * Loads and processes all notes
 */
export function loadAllNotes(): ProcessedNote[] {
	// Return cached notes if available
	if (notesCache) {
		return notesCache;
	}

	// Find all markdown files
	const files = findMarkdownFiles(CONTENT_DIR);

	// Parse all notes
	const notes = files
		.map((file) => parseNote(file))
		.filter((note): note is ProcessedNote => note !== null);

	// Build note map for wikilink transformation
	const noteMap = buildNoteMap(notes);
	noteMapCache = noteMap;

	// Transform wikilinks in all notes
	notes.forEach((note) => {
		note.content = transformWikilinks(note.content, noteMap);
	});

	// Build backlink graph
	const backlinkMap = buildBacklinkGraph(
		notes.map((n) => ({
			slug: n.slug,
			title: n.frontmatter.title,
			content: n.rawContent
		}))
	);

	// Add backlinks to notes
	notes.forEach((note) => {
		note.backlinks = backlinkMap.get(note.slug) || [];
	});

	// Cache the processed notes
	notesCache = notes;

	return notes;
}

/**
 * Gets a single note by slug
 */
export function getNoteBySlug(slug: string): ProcessedNote | null {
	const notes = loadAllNotes();
	return notes.find((note) => note.slug === slug) || null;
}

/**
 * Gets notes by category
 */
export function getNotesByCategory(category: string): ProcessedNote[] {
	const notes = loadAllNotes();
	return notes.filter((note) => note.frontmatter.category === category);
}

/**
 * Gets notes by tag
 */
export function getNotesByTag(tag: string): ProcessedNote[] {
	const notes = loadAllNotes();
	return notes.filter((note) => note.frontmatter.tags.includes(tag));
}

/**
 * Gets all unique tags
 */
export function getAllTags(): string[] {
	const notes = loadAllNotes();
	const tags = new Set<string>();

	notes.forEach((note) => {
		note.frontmatter.tags.forEach((tag) => tags.add(tag));
	});

	return Array.from(tags).sort();
}

/**
 * Gets note metadata (for listing pages)
 */
export function getNotesMetadata(): NoteMetadata[] {
	const notes = loadAllNotes();

	return notes.map((note) => ({
		slug: note.slug,
		title: note.frontmatter.title,
		category: note.frontmatter.category,
		tags: note.frontmatter.tags,
		created: note.frontmatter.created,
		updated: note.frontmatter.updated,
		description: note.frontmatter.description,
		readingTime: note.readingTime
	}));
}

/**
 * Clears the cache (useful for development)
 */
export function clearCache() {
	notesCache = null;
	noteMapCache = null;
}
