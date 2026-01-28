<script lang="ts">
	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{ href: 'https://github.com/marcusnglee', label: 'GitHub' },
		{ href: 'https://linkedin.com/in/marcusnglee', label: 'LinkedIn' },
		{ href: 'mailto:marcusnglee@gmail.com', label: 'Email' }
	];
</script>

<footer class="footer">
	<div class="footer-container">
		<div class="footer-content">
			<div class="footer-brand">
				<span class="brand-name">Marcus Lee</span>
				<p class="footer-tagline">Building meaningful experiences through design & code</p>
			</div>

			<div class="footer-links">
				{#each socialLinks as link}
					<a href={link.href} class="footer-link" target="_blank" rel="noopener noreferrer">
						{link.label}
					</a>
				{/each}
			</div>
		</div>

		<div class="footer-bottom">
			<p class="copyright">&copy; {currentYear} Marcus Lee. All rights reserved.</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		border-top: 1px solid var(--color-border);
		background-color: var(--color-bg-secondary);
		margin-top: var(--space-24);
	}

	.footer-container {
		max-width: var(--container-xl);
		margin: 0 auto;
		padding: var(--space-12) var(--space-4);
	}

	@media (min-width: 640px) {
		.footer-container {
			padding-left: var(--space-6);
			padding-right: var(--space-6);
		}
	}

	@media (min-width: 1024px) {
		.footer-container {
			padding-left: var(--space-8);
			padding-right: var(--space-8);
		}
	}

	.footer-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
		margin-bottom: var(--space-8);
	}

	@media (min-width: 768px) {
		.footer-content {
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-start;
		}
	}

	.footer-brand {
		max-width: 24rem;
	}

	.brand-name {
		font-family: var(--font-serif);
		font-size: var(--text-xl);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
	}

	.footer-tagline {
		margin-top: var(--space-2);
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		line-height: var(--leading-relaxed);
	}

	.footer-links {
		display: flex;
		gap: var(--space-6);
		flex-wrap: wrap;
	}

	.footer-link {
		font-size: var(--text-base);
		font-weight: var(--font-medium);
		color: var(--color-text-secondary);
		text-decoration: none;
		transition: var(--transition-colors);
	}

	.footer-link:hover {
		color: var(--color-accent-crimson);
	}

	.footer-bottom {
		padding-top: var(--space-8);
		border-top: 1px solid var(--color-border-light);
	}

	.copyright {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		text-align: center;
	}
</style>
