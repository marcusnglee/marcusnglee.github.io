import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { NoteFrontmatter, ProcessedNote, NoteMetadata, GardenCategory } from '$lib/types/garden';
import { GARDEN_CATEGORIES } from '$lib/types/garden';
import {
	extractWikilinks,
	transformWikilinks,
	buildBacklinkGraph,
	generateSlug
} from '$lib/utils/wikilinks';
import { processObsidianSyntax } from '$lib/utils/obsidian-syntax';

const CONTENT_DIR = path.join(process.cwd(), 'garden');

// Cache for processed notes
let notesCache: ProcessedNote[] | null = null;
let noteMapCache: Map<string, { category: string; slug: string }> | null = null;

/**
 * Infers a category from the folder path relative to CONTENT_DIR.
 * Falls back to 'seed' if the folder name doesn't match a known category.
 */
function inferCategory(filePath: string): GardenCategory {
	const relative = path.relative(CONTENT_DIR, filePath);
	const parts = relative.split(path.sep);
	if (parts.length > 1) {
		const folder = parts[0].toLowerCase();
		if (folder in GARDEN_CATEGORIES) {
			return folder as GardenCategory;
		}
	}
	return 'seed';
}

/**
 * Infers a title from the filename (strips .md, preserves original casing).
 */
function inferTitle(filePath: string): string {
	return path.basename(filePath, '.md');
}

/**
 * Recursively finds all markdown files in a directory.
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
 * Parses a single markdown note, inferring missing frontmatter fields.
 */
function parseNote(filePath: string): ProcessedNote | null {
	try {
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		const { data, content } = matter(fileContent);
		const frontmatter = data as NoteFrontmatter;

		// Only process published notes
		if (!frontmatter.published) {
			return null;
		}

		// Infer missing fields
		const title = frontmatter.title || inferTitle(filePath);
		const category = frontmatter.category || inferCategory(filePath);
		const tags = frontmatter.tags || [];

		// Use frontmatter date, or fall back to file mtime
		let created = frontmatter.created;
		if (!created) {
			const stat = fs.statSync(filePath);
			created = stat.mtime.toISOString().split('T')[0];
		}

		const slug = generateSlug(path.basename(filePath));

		const processedContent = processObsidianSyntax(content);
		const outgoingLinks = extractWikilinks(content);
		const stats = readingTime(content);
		const wordCount = content.split(/\s+/).length;

		return {
			slug,
			frontmatter: {
				published: frontmatter.published,
				description: frontmatter.description,
				updated: frontmatter.updated,
				title,
				category,
				tags,
				created: created as string
			},
			content: processedContent,
			rawContent: content,
			readingTime: Math.ceil(stats.minutes),
			wordCount,
			backlinks: [],
			outgoingLinks
		};
	} catch (error) {
		console.error(`Error parsing note ${filePath}:`, error);
		return null;
	}
}

/**
 * Builds a map of note titles/slugs to their metadata.
 */
function buildNoteMap(notes: ProcessedNote[]): Map<string, { category: string; slug: string }> {
	const map = new Map<string, { category: string; slug: string }>();

	notes.forEach((note) => {
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
 * Loads and processes all published notes.
 */
export function loadAllNotes(): ProcessedNote[] {
	if (notesCache) {
		return notesCache;
	}

	const files = findMarkdownFiles(CONTENT_DIR);

	const notes = files
		.map((file) => parseNote(file))
		.filter((note): note is ProcessedNote => note !== null);

	const noteMap = buildNoteMap(notes);
	noteMapCache = noteMap;

	notes.forEach((note) => {
		note.content = transformWikilinks(note.content, noteMap);
	});

	const backlinkMap = buildBacklinkGraph(
		notes.map((n) => ({
			slug: n.slug,
			title: n.frontmatter.title,
			content: n.rawContent
		}))
	);

	notes.forEach((note) => {
		note.backlinks = backlinkMap.get(note.slug) || [];
	});

	notesCache = notes;

	return notes;
}

export function getNoteBySlug(slug: string): ProcessedNote | null {
	const notes = loadAllNotes();
	return notes.find((note) => note.slug === slug) || null;
}

export function getNotesByCategory(category: string): ProcessedNote[] {
	const notes = loadAllNotes();
	return notes.filter((note) => note.frontmatter.category === category);
}

export function getNotesByTag(tag: string): ProcessedNote[] {
	const notes = loadAllNotes();
	return notes.filter((note) => note.frontmatter.tags.includes(tag));
}

export function getAllTags(): string[] {
	const notes = loadAllNotes();
	const tags = new Set<string>();

	notes.forEach((note) => {
		note.frontmatter.tags.forEach((tag) => tags.add(tag));
	});

	return Array.from(tags).sort();
}

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

export function clearCache() {
	notesCache = null;
	noteMapCache = null;
}
