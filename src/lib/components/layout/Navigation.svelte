<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/garden', label: 'Garden' },
		{ href: '/garden/essays', label: 'Essays' },
		{ href: '/garden/notes', label: 'Notes' },
		{ href: '/garden/projects', label: 'Projects' }
	];

	$effect(() => {
		if (!browser) return;

		const handleScroll = () => {
			scrolled = window.scrollY > 20;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function isActive(href: string): boolean {
		if (href === '/') {
			return $page.url.pathname === '/';
		}
		return $page.url.pathname.startsWith(href);
	}
</script>

<nav class="nav" class:scrolled>
	<div class="nav-container">
		<a href="/" class="nav-brand" onclick={closeMobileMenu}>
			<span class="brand-name">Marcus Lee</span>
		</a>

		<button
			class="mobile-menu-button"
			onclick={toggleMobileMenu}
			aria-label="Toggle menu"
			aria-expanded={mobileMenuOpen}
		>
			<span class="hamburger" class:open={mobileMenuOpen}></span>
		</button>

		<div class="nav-links" class:mobile-open={mobileMenuOpen}>
			{#each navLinks as link}
				<a
					href={link.href}
					class="nav-link"
					class:active={isActive(link.href)}
					onclick={closeMobileMenu}
				>
					{link.label}
				</a>
			{/each}
		</div>
	</div>
</nav>

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 50;
		background-color: transparent;
		transition: var(--transition-all);
		border-bottom: 1px solid transparent;
	}

	.nav.scrolled {
		background-color: var(--color-bg-primary);
		border-bottom-color: var(--color-border);
		box-shadow: var(--shadow-sm);
	}

	.nav-container {
		max-width: var(--container-xl);
		margin: 0 auto;
		padding: var(--space-4) var(--space-4);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	@media (min-width: 640px) {
		.nav-container {
			padding-left: var(--space-6);
			padding-right: var(--space-6);
		}
	}

	@media (min-width: 1024px) {
		.nav-container {
			padding-left: var(--space-8);
			padding-right: var(--space-8);
		}
	}

	.nav-brand {
		font-family: var(--font-serif);
		font-size: var(--text-xl);
		font-weight: var(--font-semibold);
		color: var(--color-text-primary);
		text-decoration: none;
		transition: var(--transition-colors);
	}

	.nav-brand:hover {
		color: var(--color-accent-crimson);
	}

	.brand-name {
		display: inline-block;
	}

	.mobile-menu-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	@media (min-width: 768px) {
		.mobile-menu-button {
			display: none;
		}
	}

	.hamburger {
		position: relative;
		width: 1.5rem;
		height: 2px;
		background-color: var(--color-text-primary);
		transition: var(--transition-all);
	}

	.hamburger::before,
	.hamburger::after {
		content: '';
		position: absolute;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: var(--color-text-primary);
		transition: var(--transition-all);
	}

	.hamburger::before {
		top: -0.5rem;
	}

	.hamburger::after {
		bottom: -0.5rem;
	}

	.hamburger.open {
		background-color: transparent;
	}

	.hamburger.open::before {
		top: 0;
		transform: rotate(45deg);
	}

	.hamburger.open::after {
		bottom: 0;
		transform: rotate(-45deg);
	}

	.nav-links {
		display: none;
		flex-direction: column;
		gap: var(--space-4);
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background-color: var(--color-bg-primary);
		border-bottom: 1px solid var(--color-border);
		padding: var(--space-4);
		box-shadow: var(--shadow-lg);
	}

	.nav-links.mobile-open {
		display: flex;
	}

	@media (min-width: 768px) {
		.nav-links {
			display: flex;
			flex-direction: row;
			position: static;
			background-color: transparent;
			border-bottom: none;
			padding: 0;
			box-shadow: none;
			gap: var(--space-6);
		}
	}

	.nav-link {
		font-size: var(--text-base);
		font-weight: var(--font-medium);
		color: var(--color-text-secondary);
		text-decoration: none;
		transition: var(--transition-colors);
		position: relative;
		padding: var(--space-2) 0;
	}

	.nav-link:hover {
		color: var(--color-text-primary);
	}

	.nav-link.active {
		color: var(--color-accent-crimson);
	}

	.nav-link.active::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		right: 0;
		height: 2px;
		background-color: var(--color-accent-crimson);
	}

	@media (max-width: 767px) {
		.nav-link.active::after {
			display: none;
		}
	}
</style>
