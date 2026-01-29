<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { GARDEN_CATEGORIES, type GardenCategory } from '$lib/types/garden';

	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);
	let gardenDropdownOpen = $state(false);

	const categories = Object.entries(GARDEN_CATEGORIES) as [GardenCategory, typeof GARDEN_CATEGORIES[GardenCategory]][];

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
		<a href="/" class="nav-brand" onclick={closeMobileMenu} aria-label="Home">
			<svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
				<!-- Tea cup -->
				<path d="M17 8h1a4 4 0 0 1 0 8h-1" />
				<path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
				<!-- Steam -->
				<path d="M6 1v3" />
				<path d="M10 1v3" />
				<path d="M14 1v3" />
			</svg>
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
			<a
				href="/"
				class="nav-link"
				class:active={isActive('/')}
				onclick={closeMobileMenu}
			>
				Home
			</a>

			<!-- Garden with dropdown -->
			<div
				class="nav-dropdown"
				onmouseenter={() => gardenDropdownOpen = true}
				onmouseleave={() => gardenDropdownOpen = false}
			>
				<a
					href="/garden"
					class="nav-link has-dropdown"
					class:active={isActive('/garden')}
					onclick={closeMobileMenu}
				>
					Garden
					<span class="dropdown-arrow">▾</span>
				</a>

				{#if gardenDropdownOpen}
					<div class="dropdown-menu">
						<div class="dropdown-grid">
							{#each categories as [key, info]}
								<a
									href="/garden?category={key}"
									class="dropdown-item"
									onclick={closeMobileMenu}
								>
									<span class="item-label">{info.label}</span>
									<span class="item-description">{info.description}</span>
								</a>
							{/each}
						</div>
						<div class="dropdown-footer">
							<a href="/garden" class="view-all" onclick={closeMobileMenu}>
								View all entries →
							</a>
						</div>
					</div>
				{/if}
			</div>
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
		text-decoration: none;
		transition: var(--transition-all);
		color: var(--color-accent-crimson);
	}

	.nav-brand:hover {
		transform: scale(1.1);
		color: var(--color-text-primary);
	}

	.brand-icon {
		width: 28px;
		height: 28px;
		display: block;
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
			align-items: center;
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

	/* Dropdown styles */
	.nav-dropdown {
		position: relative;
		padding-bottom: var(--space-4);
		margin-bottom: calc(-1 * var(--space-4));
	}

	.has-dropdown {
		display: flex;
		align-items: center;
		gap: var(--space-1);
	}

	.dropdown-arrow {
		font-size: 1.1em;
		opacity: 0.7;
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		right: 0;
		width: 480px;
		max-width: calc(100vw - 2rem);
		background-color: var(--color-bg-primary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-xl);
		padding: var(--space-4);
		z-index: 100;
	}

	/* Invisible bridge to connect trigger to dropdown */
	.nav-dropdown::after {
		content: '';
		position: absolute;
		top: 100%;
		right: 0;
		width: 100%;
		height: 16px;
		background: transparent;
		display: none;
	}

	.nav-dropdown:hover::after {
		display: block;
	}

	.dropdown-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-2);
	}

	.dropdown-item {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: var(--space-3);
		border-radius: var(--radius-md);
		text-decoration: none;
		transition: var(--transition-colors);
	}

	.dropdown-item:hover {
		background-color: var(--color-bg-secondary);
	}

	.item-label {
		font-size: var(--text-sm);
		font-weight: var(--font-medium);
		color: var(--color-text-primary);
	}

	.item-description {
		font-size: var(--text-xs);
		color: var(--color-text-tertiary);
		line-height: var(--leading-relaxed);
	}

	.dropdown-footer {
		margin-top: var(--space-3);
		padding-top: var(--space-3);
		border-top: 1px solid var(--color-border-light);
		text-align: center;
	}

	.view-all {
		font-size: var(--text-sm);
		font-weight: var(--font-medium);
		color: var(--color-link);
		text-decoration: none;
		transition: var(--transition-colors);
	}

	.view-all:hover {
		color: var(--color-link-hover);
	}

	/* Hide dropdown on mobile - show as regular links */
	@media (max-width: 767px) {
		.dropdown-menu {
			display: none;
		}

		.dropdown-arrow {
			display: none;
		}
	}
</style>
