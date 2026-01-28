import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';

export default defineConfig({
	extensions: ['.md', '.svx'],
	remarkPlugins: [remarkGfm, remarkUnwrapImages],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap'
			}
		]
	],
	layout: {
		essay: './src/lib/layouts/EssayLayout.svelte',
		note: './src/lib/layouts/NoteLayout.svelte',
		project: './src/lib/layouts/ProjectLayout.svelte'
	}
});
