export type GardenCategory = 'seed' | 'essay' | 'project' | 'library' | 'tea';

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
	project: {
		label: 'Projects',
		description: 'Things I am building or thinking through',
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
	title?: string;
	published: boolean | string;
	category?: GardenCategory;
	tags?: string[];
	created?: string;
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
	frontmatter: Required<Pick<NoteFrontmatter, 'title' | 'category' | 'tags' | 'created'>> &
		Pick<NoteFrontmatter, 'updated' | 'description' | 'published'>;
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
