export type GardenCategory = 'seed' | 'essay' | 'playlist' | 'library' | 'tea';

export interface CategoryInfo {
	label: string;
	description: string;
	color: 'crimson' | 'ochre' | 'sage' | 'default';
}

export const GARDEN_CATEGORIES: Record<GardenCategory, CategoryInfo> = {
	seed: {
		label: 'Seeds',
		description: 'Early ideas and rough thoughts, still germinating',
		color: 'sage'
	},
	essay: {
		label: 'Essays',
		description: 'Long-form writing on topics I care about',
		color: 'crimson'
	},
	playlist: {
		label: 'Playlists',
		description: 'Curated collections of music and sounds',
		color: 'ochre'
	},
	library: {
		label: 'Library',
		description: 'Books, articles, and resources worth revisiting',
		color: 'default'
	},
	tea: {
		label: 'Tea Notes',
		description: 'Tasting notes from my tea explorations',
		color: 'sage'
	}
};

export interface NoteFrontmatter {
	title: string;
	published: boolean;
	category: GardenCategory;
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
	category: GardenCategory;
	tags: string[];
	created: string;
	updated?: string;
	description?: string;
	readingTime: number;
}
