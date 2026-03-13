import type { PortfolioItem } from '$lib/types/portfolio';
import type { PageLoad } from './$types';

const resumeItems: PortfolioItem[] = [
	{
		id: 'arrowstreet',
		category: 'experience',
		title: 'Arrowstreet Capital',
		subtitle: 'Software Engineer Intern',
		description: 'Built compute infrastructure for quantitative research.',
		image: '/arrowstreet_logo.jpg',
		link: 'https://www.arrowstreetcapital.com/',
		tags: ['Quant Finance', 'HPC', 'Distributed Systems'],
		featured: true,
		year: 'Summer 2025'
	},
	{
		id: 'gojo-labs',
		category: 'experience',
		title: 'Gojo Labs',
		subtitle: 'Software Engineer Intern',
		description:
			'Developed frontend interfaces and smart contracts for the DoubleUp Citizens product launch.',
		image: '/doubleup_logo.jpg',
		link: 'https://www.doubleup.fun/',
		tags: ['Web3', 'Frontend', 'Smart Contracts'],
		featured: true,
		year: 'Summer 2024'
	},
	{
		id: 'agilysys',
		category: 'experience',
		title: 'Agilysys',
		subtitle: 'Cloud Engineer Intern',
		description: 'Automated deployment and disaster recovery pipelines for Kubernetes clusters.',
		image: '/agilysys_logo.jpg',
		link: 'https://www.agilysys.com/',
		tags: ['Infrastructure as Code', 'DevOps', 'Kubernetes'],
		year: 'Summer 2023'
	},
	{
		id: 'williams',
		category: 'education',
		title: 'Williams College',
		subtitle: 'BA Computer Science',
		description:
			'Pursuing a liberal arts education with a focus on CS, distributed systems, and design.',
		tags: ['Computer Science', 'Liberal Arts'],
		year: '2022–2026'
	}
];

export const load: PageLoad = () => ({ items: resumeItems });
