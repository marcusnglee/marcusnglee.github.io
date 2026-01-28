<script lang="ts"></script>

<div class="bio">
	<div class="bio-content">
		<p class="bio-text">
			<span class="name"><strong>Marcus Lee</strong></span> is a student pursuing his BA in Computer
			Science at Williams College. His work spans distributed systems, automated cloud infrastructure,
			and frontend design. Currently, he's exploring thoughtful AI tooling for students and decentralized
			economies—
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://medium.com/design-bootcamp/we-love-automation-but-hate-ai-what-ux-teaches-us-about-control-and-trust-c2f41c29906b"
				class="bio-link"
			>
				building software for people that makes them feel empowered and in control.
			</a>
			Between Kubernetes and Svelte, he'll always welcome another to conversation over a lightly-brewed
			cup of tea. This is also the only time Marcus will describe himself in the 3rd person.
		</p>
	</div>

	<div class="bio-links">
		<a
			target="_blank"
			rel="noopener noreferrer"
			href="https://www.linkedin.com/in/marcusnglee"
			class="social-link"
		>
			linkedin.com/in/marcusnglee
		</a>
		<a
			target="_blank"
			rel="noopener noreferrer"
			href="https://www.github.com/marcusnglee"
			class="social-link"
		>
			github.com/marcusnglee
		</a>
	</div>
</div>

<style>
	.bio {
		margin-bottom: var(--space-12);
	}

	.bio-content {
		margin-bottom: var(--space-6);
	}

	.bio-text {
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		line-height: var(--leading-relaxed);
	}

	.name {
		font-family: var(--font-serif);
		font-size: var(--text-xl);
		color: var(--color-text-primary);
	}

	.bio-link {
		color: var(--color-link);
		text-decoration: underline;
		text-decoration-color: transparent;
		transition: var(--transition-colors);
	}

	.bio-link:hover {
		color: var(--color-link-hover);
		text-decoration-color: currentColor;
	}

	.bio-links {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-6);
		padding-bottom: var(--space-4);
	}

	.social-link {
		font-size: var(--text-base);
		font-weight: var(--font-medium);
		color: var(--color-text-primary);
		text-decoration: none;
		transition: var(--transition-colors);
	}

	.social-link:hover {
		color: var(--color-accent-crimson);
	}
</style>
