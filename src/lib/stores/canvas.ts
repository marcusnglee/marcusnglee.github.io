import { writable } from 'svelte/store';

export const navigateFn = writable<((id: string) => void) | null>(null);
export const clearSectionFn = writable<((id: string) => void) | null>(null);
export const locked = writable(false);
export const activeSection = writable<string | null>(null);
