import { writable } from 'svelte/store';

export const navigateFn = writable<((id: string) => void) | null>(null);
export const locked = writable(false);
