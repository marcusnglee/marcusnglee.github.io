export interface NoteFrontmatter {
	title: string;
	published: boolean;
	category: 'essay' | 'note' | 'project';
	tags: string[];
	created: string;
	updated?: string;
	description?: string;
}

export interface BackLink {
	slug: string;
	title: string;
	context?: string;
}

export interface ProcessedNote {
	slug: string;
	frontmatter: NoteFrontmatter;
	content: string;
	rawContent: string;
	readingTime: number;
	wordCount: number;
	backlinks: BackLink[];
	outgoingLinks: string[];
}

export interface NoteMetadata {
	slug: string;
	title: string;
	category: 'essay' | 'note' | 'project';
	tags: string[];
	created: string;
	updated?: string;
	description?: string;
	readingTime: number;
}
