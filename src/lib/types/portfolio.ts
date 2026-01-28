export interface PortfolioItem {
	id: string;
	category: 'experience' | 'project' | 'creative';
	title: string;
	subtitle?: string;
	description: string;
	image?: string;
	link?: string;
	tags: string[];
	featured?: boolean;
	year?: string;
}
