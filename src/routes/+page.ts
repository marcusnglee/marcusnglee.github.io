import type { PortfolioItem } from '$lib/types/portfolio';
import type { PageLoad } from './$types';

const portfolioItems: PortfolioItem[] = [
	{
		id: 'arrowstreet',
		category: 'experience',
		title: 'Arrowstreet Capital',
		subtitle: 'Software Engineer',
		description:
			'Research Systems: Compute Platform - Building scalable infrastructure for quantitative research',
		image: '/arrowstreet_logo.jpg',
		link: 'https://www.arrowstreetcapital.com/',
		tags: ['Infrastructure', 'Research Systems', 'Cloud'],
		featured: true,
		year: '2024'
	},
	{
		id: 'gojo-labs',
		category: 'experience',
		title: 'Gojo Labs',
		subtitle: 'Software Engineer',
		description:
			'Frontend and Smart Contract developer for DoubleUp Citizens product launch - Web3 gaming platform',
		image: '/doubleup_logo.jpg',
		link: 'https://www.doubleup.fun/',
		tags: ['Web3', 'Frontend', 'Smart Contracts', 'Gaming'],
		featured: true,
		year: '2023'
	},
	{
		id: 'flowr',
		category: 'project',
		title: 'Flowr',
		subtitle: 'Personal Project',
		description:
			'Decentralized music platform for transparent data, payments, and ownership - Empowering artists with blockchain technology',
		image: '/flowr.png',
		link: 'https://github.com/flowrpowr',
		tags: ['Web3', 'Music', 'Blockchain', 'Open Source'],
		featured: true,
		year: '2023'
	},
	{
		id: 'agilysys',
		category: 'experience',
		title: 'Agilysys',
		subtitle: 'Cloud Engineer',
		description:
			'Automated deployment and disaster recovery for kubernetes clusters - Building resilient cloud infrastructure',
		image: '/agilysys_logo.jpg',
		link: 'https://www.agilysys.com/',
		tags: ['Kubernetes', 'DevOps', 'Cloud', 'Automation'],
		year: '2022'
	},
	{
		id: 'vibe-studios',
		category: 'creative',
		title: 'Vibe Studios Vegas',
		subtitle: 'Audio Engineer',
		description:
			'Professional recording and mixing for artists - Bringing creative visions to life through sound',
		image: '/vibes_studio.jpg',
		link: 'https://vibestudiosvegas.com/',
		tags: ['Audio', 'Music Production', 'Recording', 'Mixing'],
		year: '2021'
	}
];

export const load: PageLoad = () => {
	const featuredWork = portfolioItems.filter((item) => item.featured);
	const allWork = portfolioItems;

	return {
		featuredWork,
		allWork
	};
};
